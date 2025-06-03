"use client";
import Media from "@/_Dashboard/layouts/Media/Media";
import styles from "./page.module.css";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import LoaderLayout from "@/_Dashboard/_Components/LoaderLayout/LoaderLayout";
import { notFound } from "next/navigation";

const Page = () => {
  const { schema } = useSchema("media");
  if (!schema) return notFound();
  return <Media roles={schema?.options?.roles} />;
};

export default Page;
