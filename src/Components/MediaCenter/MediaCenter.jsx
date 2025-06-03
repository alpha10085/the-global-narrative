import List from "./List/List";

const MediaCenter = async ({ page = {}, categories = [] }) => {
  return <List page={page} categories={categories} />;
};

export const FallBack = () => {
  return <div style={{ minHeight: "100vh" }}>Loading...</div>;
};
export default MediaCenter;
