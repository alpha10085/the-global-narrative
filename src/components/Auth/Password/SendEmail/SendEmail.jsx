 
"use client";

// components/sendEmail/SendEmail.js
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { sendEmailVal } from "./schema";
import MailLockIcon from "@mui/icons-material/MailLock";
import { useState } from "react";
import styles from "./SendEmail.module.css"; // Assuming you're using CSS Modules
import ErrorMessage from "@/Components/Shared/ErrorMessage/ErrorMessage";
import { sendEmailFogetPassword } from "@/lib/auth";
import AsyncButton from "@/Components/Shared/AsyncButton/AsyncButton";
import InputText from "@/Components/Shared/inputText/inputText";

const SendEmail = ({ swiperRef, setEmail }) => {
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [loading, setloading] = useState(false);
  const [errorG, setErrorG] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
    setValue
  } = useForm({ resolver: joiResolver(sendEmailVal) });

  const handleSubmitEmail = async (data) => {
    try {
      setloading(true);
      const { message } = await sendEmailFogetPassword(data);
      toast.success(message || "Email sent successfully");
      setEmail(email);
      swiperRef?.current?.swiper?.slideTo(1);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form
      className={styles.sendEmail}
      onSubmit={handleSubmit((data) => handleSubmitEmail(data))}
    >
      <div className={styles.boxContent}>
        <div className={styles.boxContentOtp}>
          <MailLockIcon />
          <h1>Trouble logging in?</h1>
        </div>
        <p className={styles.desc}>
          Enter your email and we'll send you an OTP to get back into your
          account.
        </p>
      </div>
      <InputText
        showError={errorG}
        className={styles.Passwordabel}
        watch={watch}
        errors={errors}
        name="email"
        type="text"
        placeholder="email"
        onChange={setValue}
        onFocus={() => setFocus("email")}
      />
      <AsyncButton
        onLoading=""
        error={errorG ? "log in" : null}
        text="submit"
        className={` ${styles.btn}`}
        type="submit"
        loading={loading}
        spinnerColor="white"
      />
    </form>
  );
};

export default SendEmail;
