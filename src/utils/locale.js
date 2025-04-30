// src/utils/locale.handlers.js
export function getLocalizedPath(path, locale) {
  // Ensure the path starts with a slash and doesn't double the locale part
  const trimmedPath = path.startsWith("/")
    ? path === "/"
      ? ""
      : path
    : `/${path}`;
  if (trimmedPath.startsWith(`/${locale}`)) return trimmedPath;
  return `/${locale}${trimmedPath}`;
}
