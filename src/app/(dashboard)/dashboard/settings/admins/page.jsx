"use client";
import useSchema from "@/_Dashboard/hooks/auth/useSchema";
import TableLayOut from "@/_Dashboard/layouts/TableLayout/TableLayOut";
import React from "react";

const Page = () => {
  const slug = "admins";
  const { displayName = "", schema = {} } = useSchema(slug,true,"private");
  return (
    <TableLayOut
      customFilters={{ "filters[role]": ["admin"] }}
      slug={slug}
      endPoint={"users"}
      path={"settings"}
      schema={schema}
      displayName={displayName}
    />
  );
};

export default Page;
