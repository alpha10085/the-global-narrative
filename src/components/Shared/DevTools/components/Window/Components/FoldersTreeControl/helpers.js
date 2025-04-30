export const formatRoutes = (routes) => {
  const handler = (node) => {
    if (!node?.children) return node;

    node.children = node.children.reduce((acc, child) => {
      if (child?.name?.includes("layout.") || child?.type === "file") {
        return acc;
      }

      if (child?.type === "folder") {
        child.page = child?.children?.some((c) =>
          ["page.jsx", "page.js"].includes(c.name)
        );
        acc.push(handler(child));
      } else {
        acc.push(child);
      }

      return acc;
    }, []);

    return node;
  };

  return handler({...routes});
};
