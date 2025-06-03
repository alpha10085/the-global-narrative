"use client";

// components/resetPassword/ResetPassword.js

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import { ResetPasswordVal } from "./schema";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useState } from "react";
import ErrorMessage from "@/Components/Shared/ErrorMessage/ErrorMessage";
import styles from "./ResetPassword.module.css";
import OtpInputField from "./components/OtpInputField/OtpInput";
import { resetPassword } from "@/lib/auth";
import { useRouter } from "next/navigation";
import InputText from "@/Components/Shared/inputText/inputText";
import AsyncButton from "@/Components/Shared/AsyncButton/AsyncButton";

const ResetPassword = ({ email }) => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [errorG, setErrorG] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(ResetPasswordVal),
  });
  
  const handleFormSubmit = async (data) => {
    try {
      setloading(true);
      // Call the resetPassword function and wait for the response
      const response = await resetPassword({ formdata: { ...data, email } });
      // Show success toast and redirect upon success
      toast.success("Password changed successfully");
      router.push("/profile");
    } catch (error) {
      // Show error toast and redirect upon failure
      toast.error(error.message || "An error occurred");
      router.push("/auth/log-in");
    } finally {
      setloading(false);
    }
  };

  return (
    <form
      className={styles.resetPassword} // Apply CSS Module class
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.boxContentOtp}>
        <LockPersonIcon />
        <h1>We sent OTP to your email</h1>
        <p>Enter your OTP code here to reset your password</p>
      </div>
      <OtpInputField
        errors={errors?.OTP}
       onChange={setValue}
        setValue={setValue}
      />

      <InputText
        showError={errorG}
        className={styles.Passwordabel}
        watch={watch}
        errors={errors}
        name="password"
        type="password"
        placeholder="password"
       onChange={setValue}
        onFocus={() => setFocus("password")}
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

export default ResetPassword;
