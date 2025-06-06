"use client";
import { use } from "react";
import DynamicForm from "@/_Dashboard/layouts/DynamicForm/DynamicForm";
import { GetSingleEntry } from "@/_Dashboard/lib/dashboard";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import { notFound } from "next/navigation";
import ErrorLayOut from "@/_Dashboard/Components/ErrorLayOut/ErrorLayOut";
import LoaderLayout from "@/_Dashboard/Components/LoaderLayout/LoaderLayout";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import { useLocale } from "next-intl";

const Page = (props) => {
  const { id } = use(props.params);
  const searchParams = use(props.searchParams);

  const locale = useLocale();
  let slug = "pages";
  const { schema = null, validation, displayName, type } = useSchema(id);
  const language = schema.options.translation
    ? searchParams?.language || locale
    : null;
  const {
    data = {},
    error,
    isLoading,
    refetch,
  } = useAsyncQuery({
    queryFn: GetSingleEntry,
    queryKey: [id, { slug }, language],
    cache: schema?.options?.cache?.duration || "0s",
    enabled: schema,
  });

  if (isLoading) return <LoaderLayout />;
  if (!schema) return notFound();
  // Determine mode based on error
  if (error && error?.status !== 404) return <ErrorLayOut />;
  let mode = error?.status === 404 ? "create" : "update";

  return (
    <DynamicForm
      data={mode === "create" ? error.details.defaultSchema : data}
      slug={slug}
      type={type}
      endpoint={id}
      mode={mode}
      displayName={displayName}
      schema={schema}
      validation={validation}
      locale={locale}
      language={language}
      queryKey={[id, { slug }]}
      refetch={refetch}
    />
  );
};

export default Page;
