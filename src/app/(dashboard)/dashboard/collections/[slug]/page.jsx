"use client";
import { use } from "react";
import TableLayOut from "@/_Dashboard/layouts/TableLayout/TableLayOut";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import LoaderLayout from "@/_Dashboard/components/LoaderLayout/LoaderLayout";

const Page = (props) => {
  const { slug } = use(props.params);
  const { displayName = "", schema = {} } = useSchema(slug ,true, "collections");

  return (
    <TableLayOut
      displayName={displayName}
      schema={schema}
      pathname={slug}
      slug={slug}
    />
  );
};

export default Page;
