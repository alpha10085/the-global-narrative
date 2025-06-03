"use client";
import ErrorLayOut from "@/_Dashboard/_Components/ErrorLayOut/ErrorLayOut";
import LoaderLayout from "@/_Dashboard/_Components/LoaderLayout/LoaderLayout";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import DynamicForm from "@/_Dashboard/layouts/DynamicForm/DynamicForm";
import { generateInitialize } from "@/_Dashboard/lib/dashboard";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { use } from "react";
const Page = (props = {}) => {
  const { slug } = use(props.params);
  const locale = useLocale();
  const searchParams = use(props.searchParams);
  const { displayName, schema, validation, type } = useSchema(slug);
  const language = schema.options.translation
    ? searchParams?.language || locale
    : null;
  const { error, data, isLoading, refetch } = useAsyncQuery({
    queryFn: generateInitialize,
    queryKey: ["generateInitialize", slug],
    cache: "0s",
    enabled: schema?.options?.translation === true,
  });
  if (isLoading && schema?.options?.translation === true ) return <LoaderLayout />;
  if (!schema || type !== "collections" || !schema.options.roles.view)
    return notFound();
  // need error ui
  if (error) return <ErrorLayOut />;

  return (
    <DynamicForm
      displayName={displayName}
      schema={schema}
      validation={validation}
      slug={slug}
      mode={"create"}
      type={"collections"}
      data={data}
      refetch={refetch}
      locale={locale}
      language={language}
    />
  );
};

export default Page;
