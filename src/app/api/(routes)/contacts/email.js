export const ContactNotifyEmailTemplate = ({
  name = "",
  email = "",
  phone = "",
  createdAt = "",
  message = "",
}) => {
  function capitalizeEachWord(text) {
    if (typeof text !== "string") return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Contact Notification</title>
    <meta name="color-scheme" content="light only" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color: #ffffff; margin: 0; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000;">
    <div style="max-width: 480px; margin: auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 10px; padding: 32px; text-align: center; color: #000000;">
      
      <div class="logo">
        <img 
          src="https://the-global-narrative.vercel.app/_next/image?url=%2Fmedia%2Fmain-logo-fu-black.png&w=1920&q=100" 
          alt="Logo" 
          width="120"
           style="
    display: block;
    margin: 0 auto 16px;
    background-color: #ffffff;
    padding: 8px;
    border-radius: 8px;
    color-scheme: light only;
    -webkit-filter: invert(0) !important;
    filter: invert(0) !important;
  "
        />
      </div>

      <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; color: #000000;">📩 New Contact Message</h1>

      <div style="text-align: left; font-size: 15px; color: #000000; margin-bottom: 24px; line-height: 1.6;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Created At:</strong> ${new Date(
          createdAt
        ).toLocaleString()}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; border-radius: 6px; padding: 12px 16px; font-size: 14px; font-style: italic; color: #000000;">
          ${message}
        </div>
      </div>

      <p style="margin-top: 32px; font-size: 12px; color: #666666; text-align: center;">
        &copy; ${new Date().getFullYear()} ${capitalizeEachWord(
    process.env.NEXT_PUBLIC_project_name
  )}. All rights reserved.
      </p>
    </div>
  </body>
</html>`;
};
