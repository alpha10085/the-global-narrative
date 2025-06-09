"use client";
import styles from "./FormPassword.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import InputText from "@/components/Shared/inputText/inputText";

import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import { useState } from "react";
import { UpdatePasswordVal, UpdateProfileVal } from "../schema";
import { updatePassword } from "@/lib/auth";

const FormPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(UpdatePasswordVal) });

  const handlePasswordReset = async (formdata) => {
    setLoading(true);
    try {
      toast.promise(updatePassword({ ...formdata }), {
        loading: "saveing...",
        success: (data) => {
          return `Changed successfully!`;
        },
        error: (error) => {
          return error.message;
        },
      });
    } catch (error) {
      toast.error(error.message || "Error updating password", {
        style: { marginTop: "5px" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handlePasswordReset)}
        className={`${styles.Registration}`}
      >
        <InputText
          className={styles.signUpLabel}
          watch={watch}
          errors={errors}
          name="currentpassword"
          type="password"
          placeholder="current_password "
       onChange={setValue}
        />
        <InputText
          className={styles.signUpLabel}
          watch={watch}
          errors={errors}
          name="newpassword"
          type="password"
          placeholder="new password "
       onChange={setValue}
        />
        <AsyncButton
          className={`${styles.btn}`}
          error={null}
          loading={loading}
          onLoading=" "
          type="submit"
          text="Save"
        />
      </form>
    </>
  );
};

export default FormPassword;
