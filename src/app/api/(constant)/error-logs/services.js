import { errorLogModel } from "@/_Backend/database/models/constant/errorLog.model";
import { errorReportTemplate } from "@/_Backend/services/emails/error-report/template";
import { sendEmail } from "@/_Backend/utils/email";
import { isProductionMode } from "@/config/main";
import { systemLogger } from "@/utils/consoleProxy";

export const sendEmailToTeam = async (data) => {
  try {
    const reault = await sendEmail({
      html: errorReportTemplate({
        ...data?._doc,
        stack: data?.stack,
        date: new Date(data?.createdAt).toLocaleString(),
        message: data?.message,
      }),
      subject: `⚠️ Monitoring Alert – ${process.env.NEXT_PUBLIC_project_name}`,
      to: "alpha10085@gmail.com",
    });
  } catch (error) {}
};

export const reportError = async ({ userAgent, deteils }) => {
  try {
    if (!isProductionMode) return null;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const isExitstBefore = await errorLogModel.findOne({
      message: deteils?.message,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!isExitstBefore) {
      console.log("error is is Exitsts Before");
      const newDocerrorLog = new errorLogModel({
        ...deteils,
        ip: userAgent.ip || "system",
        location: {
          country: userAgent?.country || "system",
          timezone: userAgent?.timezone || "system",
        },
        os: userAgent?.os?.name || "system",
        browser: userAgent.browser.name || "system",
      });

      await newDocerrorLog.save();
      await sendEmailToTeam(newDocerrorLog);
    }
  } catch (error) {
    console.log("🚀 ~ reportError ~ error:", error);
    systemLogger("🚀 ~ reportError ~ error:", error);
  }
  return true;
};
