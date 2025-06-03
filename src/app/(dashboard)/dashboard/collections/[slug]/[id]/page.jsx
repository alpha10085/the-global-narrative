"use client";
import { use } from "react";
import DynamicForm from "@/_Dashboard/layouts/DynamicForm/DynamicForm";
import { GetSingleEntry } from "@/_Dashboard/lib/dashboard";
import { notFound } from "next/navigation";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import LoaderLayout from "@/_Dashboard/Components/LoaderLayout/LoaderLayout";

import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import ErrorLayOut from "@/_Dashboard/Components/ErrorLayOut/ErrorLayOut";
import { useLocale } from "next-intl";
const Page = (props) => {
  const { id, slug = "" } = use(props.params);
  
      const locale = useLocale()
  const searchParams = use(props.searchParams);
  const { displayName, schema, validation, type } = useSchema(slug);
  const language = schema.options.translation
    ? searchParams?.language || locale
    : null;
  const enabled = !!schema?.options?.roles?.view;
  const queryKey = [id, { slug }, language];
  const {
    data = {},
    error,
    isLoading,
    refetch,
  } = useAsyncQuery({
    queryFn: GetSingleEntry,
    queryKey,
    cache: schema?.options?.cache?.duration,
    enabled,
  });
  // loading conditions
  if (isLoading) return <LoaderLayout />;
  // not found conditions
  const notFoundConditions = type !== "collections";
  if (notFoundConditions) return notFound();
  // need error ui
  if (error) return <ErrorLayOut />;
  return (
    <DynamicForm
      type={type}
      displayName={displayName}
      schema={schema}
      validation={validation}
      data={data}
      id={id}
      slug={slug}
      locale={locale}
      language={language}
      queryKey={[id, { slug }]}
      refetch={refetch}
    />
  );
};

export default Page;
