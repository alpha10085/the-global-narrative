"use client";

import NextLink from "next/link";
import { useHandleherfLink } from "./helpers";

const Link = ({ onClick = () => {}, href, children, className, ...props }) => {
  const handlers = useHandleherfLink(href);

  return (
    <NextLink
      onClick={handlers.onClick(onClick)}
      href={handlers?.href}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
