"use client";
import styles from "./PasswordForm.module.css";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import AsyncButton from "@/componentss/Shared/AsyncButton/AsyncButton";
import { PasswordFormVal } from "./schema";
import TextInput from "../../Inputs/textInput/textInput";
import { updatePassword } from "@/lib/auth";
const PasswordForm = ({ theme, translations = {} }) => {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: joiResolver(PasswordFormVal),
    mode: "onTouched",
  });

  const handeler = async (form) => {
    setloading(true);
    toast.promise(updatePassword(form), {
      loading: "saveing...",
      success: (res) => {
        setloading(false);
        return `updated successflly`;
      },
      error: ({ message = "something is wrong" }) => {
        setloading(false);
        return message;
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(handeler)}
      className={`${styles.form} ${theme.background} ${theme.bord20} flex wrap just-sb gap20`}
    >
      <TextInput
        theme={theme}
        className={styles?.label}
        currentValue={watch("currentpassword")}
        error={errors?.currentpassword?.message}
        field={{
          name: "currentpassword",
          label: translations?.inputs?.currentPassword,
          placeholder: translations?.inputs?.currentPassword_ph,
          type: "password",
          required: true,
        }}
        watch={watch}
        key={"currentpassword"}
        onChange={setValue}
      />
      <TextInput
        theme={theme}
        className={styles?.label}
        currentValue={watch("newpassword")}
        error={errors?.newpassword?.message}
        field={{
          name: "newpassword",
          label: translations?.inputs?.newPassword,
          placeholder: translations?.inputs?.newPassword_ph,
          type: "password",
          required: true,
        }}
        watch={watch}
        key={"newpassword"}
        onChange={setValue}
      />
      <div className=" flex just-c  w-100">
        <AsyncButton
          className={`  ${styles.btnsave}  ${theme.button}  `}
          error={null}
          loading={loading}
          onLoading=" "
          type="submit"
          text={translations?.save}
          theme={theme.name}
        />
      </div>
    </form>
  );
};

export default PasswordForm;
