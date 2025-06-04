import { errorReportTempalte } from "@/_Backend/services/emails/error-report/template";
import { sendEmail } from "@/_Backend/utils/email";

export const sendEmailToTeam = async (req, data) => {
  try {
    console.log("🚀 ~ sendEmailToTeam ~ data:", data);
    const body = req.body;
    console.log("🚀 ~ sendEmailToTeam ~ body:", body);

    const reault = await sendEmail({
      html: errorReportTempalte({
        stack: data?.stack,
        //toLocaleDateString
        date: new Date(data?.createdAt).toLocaleString(),
        message: data?.message,
      }),
      subject: `⚠️ Monitoring Alert – ${process.env.NEXT_PUBLIC_project_name}`,
      to: "alpha10085@gmail.com",
    });

    console.log(reault);
  } catch (error) {
    console.log("🚀 ~ sendEmailToTeam ~ error:", error);
  }
};
