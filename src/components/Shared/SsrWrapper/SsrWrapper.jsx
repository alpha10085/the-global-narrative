import React from "react";

const SsrWrapper = ({
  params: params_enable = true,
  searchParams: searchParams_enable = true,
  Component,
  QueryFN = null,
  Querykey= []
}) => {
  return async ({ params, searchParams }) => {
    const data = !QueryFN ? {} : await QueryFN(...Querykey);

    return (
      <Component
        searchParams={searchParams_enable ? await searchParams : {}}
        params={params_enable ? await params : {}}
        data={data}
      />
    );
  };
};

export default SsrWrapper;
