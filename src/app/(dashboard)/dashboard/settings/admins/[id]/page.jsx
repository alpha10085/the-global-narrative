"use client";
import { use } from "react";
import DynamicForm from "@/_Dashboard/layouts/DynamicForm/DynamicForm";
import { GetSingleEntry } from "@/_Dashboard/lib/dashboard";
import { notFound } from "next/navigation";
import useAsyncQuery from "@/hooks/useAsyncQuery";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import LoaderLayout from "@/_Dashboard/components/LoaderLayout/LoaderLayout";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import ErrorLayOut from "@/_Dashboard/components/ErrorLayOut/ErrorLayOut";
import { useLocale } from "next-intl";

const Page = (props) => {
  const { theme } = useTheme();
  const { id,  } = use(props.params);
  
      const locale = useLocale()
  const slug = "users";
  const {
    schema,
    validation,
    displayName,
  } = useSchema("admins",true,"private");
  const enabled = !!schema?.options?.roles?.view;
  const queryKey = [id, { slug }];
  const {
    data = {},
    error,
    isLoading,
    refetch,
  } = useAsyncQuery({
    queryFn: GetSingleEntry,
    queryKey,
    cache: schema?.options?.cache?.duration,
    enabled: !!schema,
  });
  // loading conditions
  if (isLoading) return <LoaderLayout />;
  // not found conditions
  const notFoundConditions = !schema || !enabled;
  if (notFoundConditions) return notFound();
  // need error ui
  if (error) return <ErrorLayOut />;

  return (
    <DynamicForm
      displayName={displayName}
      schema={schema}
      validation={validation}
      data={data}
      id={id}
      slug={slug}
      locale={locale}
      language={locale}
      queryKey={[id, { slug }]}
      refetch={refetch}
    />
  );
};

export default Page;
