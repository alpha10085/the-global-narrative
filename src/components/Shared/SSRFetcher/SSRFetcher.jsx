import { ssrApi } from "@/utils/api";
import { delay } from "@/utils/delay";
import { Suspense } from "react";

const fetchData = async (path, options) => {
  if (!path) throw new Error("Path is required");
  try {
    return await ssrApi(path, options);
  } catch (error) {
    console.error("Fetcher error:", error);
    return null;
  }
};

const FetcherComponent = async ({
  path,
  options = {},
  Component,
  data = {},
  props = {},
}) => {
  const fetchedData = await fetchData(path, options);
  return fetchedData ? (
    <Component {...props} data={{ ...data, ...fetchedData }} />
  ) : null;
};

const DefaultFallback = () => <div>loading...</div>;

/**
 * A server-side data-fetching component that uses React Suspense.
 *
 * @component
 * @param {Object} props - The props for SSRFetcher.
 * @param {React.ComponentType} props.Component - The component to render with fetched data.
 * @param {string} props.path - The API endpoint to fetch data from.
 * @param {Object} [props.options={}] - Additional options for the API request.
 * @param {Object} [props.data={}] - Initial data to merge with the fetched data.
 * @param {Object} [props.props={}] - Additional props to pass to the rendered component.
 * @param {React.ElementType} [props.Fallback=DefaultFallback] - A fallback component to show while data is loading.
 * @returns {JSX.Element} A Suspense-wrapped component that fetches and renders data.
 */
const SSRFetcher = ({ Fallback = DefaultFallback, ...props }) => (
  <Suspense fallback={<Fallback />}>
    <FetcherComponent {...props} />
  </Suspense>
);

export default SSRFetcher;
