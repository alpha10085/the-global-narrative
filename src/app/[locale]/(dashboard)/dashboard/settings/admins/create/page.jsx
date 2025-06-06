"use client";
import ErrorLayOut from "@/_Dashboard/Components/ErrorLayOut/ErrorLayOut";
import LoaderLayout from "@/_Dashboard/Components/LoaderLayout/LoaderLayout";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import DynamicForm from "@/_Dashboard/layouts/DynamicForm/DynamicForm";
import { notFound } from "next/navigation";
import { use } from "react";
const Page = (props = {}) => {
  const { locale = "en" } = use(props.params);

  const slug = "admins";
  const {
    displayName,
    schema,
    validation,
  } = useSchema(slug);

  // not found conditions
  const notFoundConditions = !schema 
  if (notFoundConditions) return notFound();

  return (
    <DynamicForm
      endpoint={"users"}
      displayName={displayName}
      schema={schema}
      validation={validation}
      slug={"users"}
      mode={"create"}
      type={"collections"}
      path={"settings"}
      locale={locale}
      language={locale}
    />
  );
};

export default Page;
