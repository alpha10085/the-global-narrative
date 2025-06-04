import jwt from "jsonwebtoken";
import { forgetPasswordLayout } from "./template.js";
import { transporter } from "../../../../utils/sendEmail.js";
export const forgetPasswordEmail = async (email, Pincode) => {
  try {
    let token = jwt.sign({ email }, process.env.SECRETKEY, {
      expiresIn: "15m",
    });
    const data = await transporter.sendMail({
      from: `"" <${process.env.Email_username}>`, // sender address
      to: email, // list of receivers
      subject: "Forget Your Password ?", // Subject line
      html: forgetPasswordLayout(token, Pincode).toString(), // html body
    });
    return {
      message: `We sent email to ${email} `,
      data,
      success: true,
    };
  } catch (error) {
    return {
      message: error?.message || "some thing went wrong try again later.",
      data: error,
      success: false,
    };
  }
};


/*

import jwt from "jsonwebtoken";
import { confirmationLayout } from "./temaplate.js";
// import { transporter } from "../../../utils/sendEmail.js";
import nodemailer from "nodemailer";

const confirmEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email_user,
      pass: process.env.Email_password,
    },
  });

  const token = jwt.sign({ email }, process.env.SECRETKEY);

  const info = await transporter.sendMail({
    from: ` 'Mazen Sherif' <${process.env.EMAIL_NAME}>`, //sender adress
    to: email, //list of recivers
    subject: "Verfiy Your Email", //subject line
    html: confirmationLayout(token), //html body
  });
};

export default confirmEmail;
*/