const SsrWrapper = ({
  params: enableParams = true,
  searchParams: enableSearchParams = true,
  Component,
  QueryFN = null,
  Querykey = [],
}) => {
  return async ({ params, searchParams }) => {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
      enableParams ? params : {},
      enableSearchParams ? searchParams : {},
    ]);
    const data = QueryFN
      ? await QueryFN(...Querykey, {
          params,
          searchParams,
        })
      : {};
    return (
      <Component
        params={resolvedParams}
        searchParams={resolvedSearchParams}
        data={data}
      />
    );
  };
};

export default SsrWrapper;
