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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 40px 16px;
        color: #000000;
      }

      .card {
        max-width: 480px;
        margin: auto;
        background: #ffffff;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        padding: 32px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        color: #000000;
      }

      .logo img {
        width: 120px;
        height: auto;
        margin-bottom: 0px;
      }

      h1 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        color: #000000;
      }

      .details {
        text-align: left;
        font-size: 15px;
        color: #000000;
        margin-bottom: 24px;
        line-height: 1.6;
      }

      .message-box {
        background: #f5f5f5;
        border-radius: 6px;
        padding: 12px 16px;
        font-size: 14px;
        font-style: italic;
        color: #000000;
        text-align: left;
      }

      .footer {
        margin-top: 32px;
        font-size: 12px;
        color: #666666;
        text-align: center;
      }

      a {
        color: #0070f3;
        text-decoration: none;
      }

      strong {
        color: #000000;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="logo">
        <img src="https://the-global-narrative.vercel.app/_next/image?url=%2Fmedia%2Fmain-logo-fu-black.png&w=1920&q=100" alt="Logo" />
      </div>
      <h1>📩 New Contact Message</h1>

      <div class="details">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Created At:</strong> ${new Date(createdAt).toLocaleString()}</p>
        <p><strong>Message:</strong></p>
        <div class="message-box">
          ${message}
        </div>
      </div>

      <p class="footer">&copy; ${new Date().getFullYear()} ${capitalizeEachWord(
        process.env.NEXT_PUBLIC_project_name
      )}. All rights reserved.</p>
    </div>
  </body>
</html>`;
};
