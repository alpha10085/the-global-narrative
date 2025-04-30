"use client";
import styles from "./FormDetails.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import InputText from "@/components/Shared/inputText/inputText";
import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import { useState, useEffect } from "react";
import { UpdateProfileVal } from "../schema";
import { updateProfile } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthProvider";
import { isEqual } from "lodash";
const FormDetails = () => {
  const [loading, setLoading] = useState(false);
  const { session, signIn,updateSession } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(UpdateProfileVal),
    values: {
      fullName: session?.fullName || "",
      email: session?.email || "",
    },
  });

  const condition = isEqual(
    {
      fullName: session?.fullName || "",
      email: session?.email || "",
    },
    getValues()
  );

  const handleUpdateProfile = async (formdata) => {
    if (condition) return toast.error("No changes to update your profile");
    setLoading(true);
    try {
      toast.promise(updateProfile({ ...formdata }), {
        loading: "saveing...",
        success: ({data,message}) => {
          // Update session after successful profile update
          updateSession({ profile: data });
          return `${message}` || `Changed successfully!`;
        },
        error: (error) => {
          return error.message;
        },
      });
    } catch (error) {
      toast.error(error.message || "Error updating profile", {
        style: { marginTop: "5px" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className={`${styles.Registration}`}
    >
      <InputText
        className={styles.signUpLabel}
        watch={watch}
        errors={errors}
        name="fullName"
        type={"text"}
        placeholder="full name"
       onChange={setValue}
        setFocus={setFocus}
      />

      <InputText
        className={styles.signUpLabel}
        watch={watch}
        errors={errors}
        name="email"
        type="text"
        placeholder="email *"
       onChange={setValue}
        setFocus={setFocus}
      />
      <AsyncButton
        className={`${styles.btn}`}
        error={null}
        disabled={condition}
        loading={loading}
        onLoading=" "
        type="submit"
        text="Save"
      />
    </form>
  );
};

export default FormDetails;
