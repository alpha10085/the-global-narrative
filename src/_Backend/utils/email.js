import nodemailer from "nodemailer";

/**
 * Send an email using Nodemailer.
 *
 * @param {Object} options - Email options
 * @param {string} options.service - Email service provider (e.g., 'gmail')
 * @param {string} options.user - Email account username
 * @param {string} options.pass - Email account password
 * @param {string} options.from - Sender address
 * @param {string|string[]} options.to - Recipient address(es)
 * @param {string} options.subject - Subject line
 * @param {string} options.html - HTML content of the email
 * @returns {Promise<Object>} - Info from Nodemailer
 */


export const sendEmail = async ({
  service = "gmail",
  user = process.env.Email_user,
  pass = process.env.Email_pass,
  from = process.env.Email_user, // default to sender
  to,
  subject = "No Subject",
  html,
}) => {
  try {

 
    
    const transporter = nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
    

    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Let caller handle it
  }
};


