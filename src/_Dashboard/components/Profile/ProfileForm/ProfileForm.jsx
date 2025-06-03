"use client";
import { useAuth } from "@/contexts/AuthProvider";
import styles from "./ProfileForm.module.css";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import AsyncButton from "@/Components/Shared/AsyncButton/AsyncButton";
import { UpdateVal } from "./schema";
import TextInput from "../../Inputs/textInput/textInput";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import Spinner from "@/Components/Shared/Spinner/Spinner";
import { updateProfile } from "@/lib/auth";
import { isEqual } from "lodash";
//updatePassword
const ProfileForm = ({ translations = {}, auth = {} }) => {
  const { session, updateSession } = auth;

  const [loading, setloading] = useState(false);
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: joiResolver(UpdateVal),
    mode: "onTouched",
    values: {
      fullName: session?.fullName,
      phone: session?.phone,
    },
  });
  const handeler = async (form) => {
    setloading(true);
    toast.promise(updateProfile(form), {
      loading: "saveing...",
      success: (res) => {
        updateSession(res?.data);
        setloading(false);
        return `${res?.message}` || `successfully!`;
      },
      error: ({ message = "something is wrong" }) => {
        setloading(false);
        return "something is wrong";
      },
    });
  };

  const disableAction = isEqual(getValues(), {
    fullName: session?.fullName,
    phone: session?.phone,
  });
  return (
    <form
      onSubmit={handleSubmit(handeler)}
      className={`${styles.form} ${theme.background} ${theme.bord20} flex wrap just-sb gap20`}
    >
      <TextInput
        theme={theme}
        translations={translations}
        className={styles?.label}
        currentValue={watch("fullName")}
        error={errors?.fullName?.message}
        field={{
          name: "fullName",
          label: translations?.inputs?.fullName,
          placeholder: translations?.inputs?.fullName_ph,
          type: "text",
          required: true,
        }}
        key={"fullName"}
        watch={watch}
        onChange={setValue}
      />
      <TextInput
        theme={theme}
        translations={translations}
        className={styles?.label}
        currentValue={session?.email}
        field={{
          name: "email",

          label: translations?.inputs?.email,
          placeholder: translations?.inputs?.email_ph,
          type: "text",
          required: true,
          readOnly: true,
        }}
        watch={watch}
        key={"email"}
      />
      <TextInput
        theme={theme}
        translations={translations}
        className={styles?.label}
        currentValue={watch("phone")}
        error={errors?.phone?.message}
        field={{
          name: "phone",

          label: translations?.inputs?.phone,
          placeholder: translations?.inputs?.phone_ph,
          type: "text",
          required: true,
        }}
        watch={watch}
        key={"phone"}
        onChange={setValue}
      />
      {session?.role && (
        <TextInput
          theme={theme}
          translations={translations}
          className={styles?.label}
          currentValue={session?.role}
          field={{
            name: "role",
            label: translations?.inputs?.role,
            placeholder: translations?.inputs?.role_ph,
            type: "text",
            readOnly: true,
          }}
          watch={watch}
          key={"role"}
        />
      )}

      <div className=" flex just-c  w-100">
        <AsyncButton
          className={`  ${styles.btnsave}  ${theme.button}  `}
          error={null}
          loading={loading}
          disabled={disableAction}
          onLoading=" "
          theme={theme.name}
          type="submit"
          text={disableAction ? translations?.noChanges : translations?.save}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
