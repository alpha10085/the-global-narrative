"use client";
import styles from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { RegistrationVal } from "./schema";
import toast from "react-hot-toast";
import InputText from "@/componentss/Shared/inputText/inputText";

import AsyncButton from "@/componentss/Shared/AsyncButton/AsyncButton";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useQueryParams } from "@/hooks/useQueryParams";
import { signUp } from "@/lib/auth";
const Registration = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(RegistrationVal) });

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      await signIn({
        data,
        mood: "signup",
      });
    } catch (error) {
      toast.error(error?.toString() || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className={`${styles.Registration}  flex just-c gap20  al-i-c column `}
      >
        <InputText
          className={styles.signUpLabel}
          watch={watch}
          theme={"dark"}
          errors={errors}
          name="fullName"
          type="text"
          placeholder="Full Name"
          onChange={setValue}
        />

        <InputText
          className={styles.signUpLabel}
          watch={watch}
          theme={"dark"}
          errors={errors}
          name="email"
          type="text"
          placeholder="email *"
          onChange={setValue}
          autoComplete
        />
        <InputText
          className={styles.signUpLabel}
          watch={watch}
          theme={"dark"}
          errors={errors}
          name="password"
          type="password"
          placeholder="password *"
          onChange={setValue}
          autoComplete
        />
        <InputText
          className={styles.signUpLabel}
          watch={watch}
          theme={"dark"}
          errors={errors}
          name="rePassword"
          type="password"
          placeholder="re-Password *"
          onChange={setValue}
        />

        <span className={`${styles.termsSpan} flex  w-95`}>
          <p className="">
            By creating an account, you agree to our Terms and Conditions &
            Privacy Policy
          </p>
        </span>
        <AsyncButton
          className={`  ${styles.btn} `}
          error={null}
          loading={loading}
          onLoading=" "
          type="submit"
          text="Sign Up"
          spinnerColor="black"
        />
      </form>
    </>
  );
};

export default Registration;
