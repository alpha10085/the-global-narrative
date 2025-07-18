"use client";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { letsCollaborateVal } from "./schema";
import toast from "react-hot-toast";
import { useState } from "react";
import InputText from "@/components/Shared/inputText/inputText";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { HandleContactUs } from "@/lib/ContactUs";
import {
  AttachEmailIcon,
  LocalPhoneIcon,
  LocationPinIcon,
} from "@/components/icons";
const Form = ({ information = {}, siteKey }) => {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
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
    setLoading(true);
    const recaptchaToken = await recaptchaRef.current.executeAsync();

    recaptchaRef.current.reset();
    const fullForm = {
      ...form,
      recaptchaToken, // add token to form data
    };

    try {
      toast.promise(HandleContactUs(fullForm), {
        loading: "sending...",
        success: (data) => {
          reset();
          setLoading(false);
          return `Form sent successfully`;
        },
        error: (error) => {
          setLoading(false);
          return `${error.message}`;
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Form failed");
    }
  };
  const {
    Address = "Building 4/D/6, 5th Floor Nasr Street, New Maadi, Cairo, Egypt",
    phone = "(+202) 251 745 07",
    email = "info@globalnarrative.com",
  } = information;
  return (
    <>
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
          style={{
            animationDelay: `${0.8 + 1}s`,
          }}
          inputClassName={` ${styles.labelinput}`}
        />

        <InputText
          name={"email"}
          watch={watch}
          errors={errors}
          style={{
            animationDelay: `${1.2 + 1}s`,
          }}
          className={styles.label}
          placeholder={"email"}
          onChange={setValue}
          inputClassName={` ${styles.labelinput}`}
        />

        <InputText
          name={"phone"}
          watch={watch}
          errors={errors}
          style={{
            animationDelay: `${1.4 + 1}s`,
          }}
          className={styles.label}
          placeholder={"phone number"}
          onChange={setValue}
          inputClassName={` ${styles.labelinput}`}
        />

        <InputText
          name={"message"}
          watch={watch}
          errors={errors}
          style={{
            animationDelay: `${1.8 + 1}s`,
          }}
          className={`${styles.label}`}
          placeholder={"message"}
          inputClassName={`${styles.messageInput} ${styles.labelinput}`}
          onChange={setValue}
          type="textarea"
        />

        <div
          style={{
            textAlign: "start",

            animationDelay: `${2.2 + 1}s`,
          }}
          className={`flex just-sb al-i-c ${styles.bottomBox}`}
        >
          <p className={styles.recaptchaNotice}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
          <button disabled={loading} type="submit" className={styles.btnsubmut}>
            send
          </button>
        </div>
        {/* reCAPTCHA (invisible) */}
        <ReCAPTCHA sitekey={siteKey} size="invisible" ref={recaptchaRef} />
        <div className={`${styles.info} flex wrap gap25 just-fs`}>
          <div 
          style={{
           animationDelay: `${2.6 + 1}s`,
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <LocationPinIcon />
            </div>
            <div className={styles.value}>{Address}</div>
          </div>

          <div 
          style={{
           animationDelay: `${3 + 1}s`,
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <LocalPhoneIcon />
            </div>
            <div className={styles.value}>{phone}</div>
          </div>
          <div 
          style={{
           animationDelay: `${3.2 + 1}s`,
          }}
          className={`${styles.item} flex gap15`}>
            <div className="flex-c gap15">
              <AttachEmailIcon />
            </div>
            <div className={styles.value}>{email}</div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
