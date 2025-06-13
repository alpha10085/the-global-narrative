"use client";
import { useTransitionRouter } from "next-view-transitions";
import { slideToTop } from "./animtions";
import { useHandleherfLink } from "../Link/helpers";

const LinkTransition = ({ children, href = "/", ...props }) => {
  const router = useTransitionRouter();
  const handlers = useHandleherfLink(href);

  const onClick = () => {
    router.push(handlers.href, {
      onTransitionReady: slideToTop,
    });
  };

  return (
    <a
      href={handlers.href}
      onClick={(e) => {
        e.preventDefault();
        handlers.onClick(onClick)(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkTransition;
