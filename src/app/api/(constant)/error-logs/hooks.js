import { errorReportTemplate } from "@/_Backend/services/emails/error-report/template";
import { sendEmail } from "@/_Backend/utils/email";

export const sendEmailToTeam = async (req, data) => {
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

  } catch (error) {
  }
};
