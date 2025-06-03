"use client";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { letsCollaborateVal } from "./schema";
import Aos from "@/_components/Shared/Animtions/Aos/Aos";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "@/_components/Shared/inputText/inputText";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(letsCollaborateVal),
  });


  const handleClick = async (form) => {
    return null;
    setLoading(true);
    try {
      toast.promise(HandleletsCollaborate(form), {
        loading: "saveing...",
        success: (data) => {
          reset();
          return `Form sent successfully`;
        },
        error: (error) => `Form failed`,
      });
    } catch (error) {
      toast.error(error || "Form failed");
    } finally {
      setLoading(false);
    }
  };

  return (

      <form
        onSubmit={handleSubmit(handleClick)}
        className={`${styles.form}  flex column gap15`}
      >
        <InputText
          name={"name"}
          watch={watch}
          onChange={setValue}
          errors={errors}
          className={styles.label}
          placeholder={"full name"}
          inputClassName={` ${styles.labelinput}`}
        />

        <InputText
          name={"email"}
          watch={watch}
          errors={errors}
          className={styles.label}
          placeholder={"email"}
          onChange={setValue}
          inputClassName={` ${styles.labelinput}`}
        />
        <InputText
          name={"phone"}
          watch={watch}
          errors={errors}
          className={styles.label}
          placeholder={"phone number"}
          onChange={setValue}
          inputClassName={` ${styles.labelinput}`}
        />

        <InputText
          name={"message"}
          watch={watch}
          errors={errors}
          className={`${styles.label}`}
          placeholder={"message"}
          inputClassName={`${styles.messageInput} ${styles.labelinput}`}
          onChange={setValue}
          type="textarea"
        />
        <button type="submit" className={styles.btnsubmut}>
          send
        </button>
      </form>
  );
};

export default Form;
