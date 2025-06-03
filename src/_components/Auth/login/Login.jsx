"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginVal } from "./schema";
import Link from "@/_components/Shared/Link/Link";
import AsyncButton from "@/_components/Shared/AsyncButton/AsyncButton";
import { useAuth } from "@/contexts/AuthProvider";
import InputText from "@/_components/Shared/inputText/inputText";

const Login = ({ translations = {} }) => {
  const [loading, setloading] = useState(false);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm({
    resolver: joiResolver(LoginVal),
  });
  const [errorG, setErrorG] = useState(false);
  const { signIn } = useAuth();
  const handeler = async (data) => {
    try {
      setloading(true);
      await signIn({
        data,
        moode: "login",
      });
    } catch (error) {
      toast.error(error?.toString() || "something wrong");
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className={`${styles.login} flex gap5 al-i-c column `}>
        <form
          className={`${styles.login} flex gap5 al-i-c column `}
          onSubmit={handleSubmit(handeler)}
        >
          <InputText
            showError={errorG}
            className={styles.loginLabel}
            watch={watch}
            theme="light"
            errors={errors}
            name="email"
            type="text"
            placeholder={`${translations?.email}`}
            onChange={setValue}
            onFocus={() => setFocus("email")}
            autoComplete
          />
          <InputText
            showError={errorG}
            className={styles.loginLabel}
            watch={watch}
            theme="light"
            errors={errors}
            name="password"
            type="password"
            placeholder={`${translations?.password}`}
            onChange={setValue}
            onFocus={() => setFocus("password")}
            autoComplete
          />
          <span className={`${styles.termsSpan} flex al-i-c column w-100`}>
            <p className="">{translations?.message}</p>
            <span className="flex just-c">
              <p>{translations?.terms}</p>
              <p className="">&</p>
              <p>{translations?.privacy}</p>
            </span>
          </span>

          <AsyncButton
            onLoading=""
            error={errorG ? "log in" : null}
            text={`${translations?.login}`}
            className={` ${styles.btn}`}
            type="submit"
            loading={loading}
            theme={"dark"}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
