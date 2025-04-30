export const isIncludes = (pathname = "", values = []) => {
  try {
    // Compare the strings
    // Check if the route is in dynamicRoutes or any other routes that require authentication
    const check =
      values.some((route) => pathname.startsWith(route)) ||
      values.includes(pathname);
    return check;
  } catch (error) {
    return true;
  }
};
