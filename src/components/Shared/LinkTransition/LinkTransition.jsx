"use client";
import { useTransitionRouter } from "next-view-transitions";
import { slideToTop } from "./animtions";
import { useHandleherfLink } from "../Link/helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LinkTransition = ({ children, href = "/", ...props }) => {
  const router = useTransitionRouter();
  const nextRouter = useRouter();
  const handlers = useHandleherfLink(href);

  const onClick = () => {
    router.push(handlers.href, {
      onTransitionReady: slideToTop,
    });
  };

  useEffect(() => {
    if (href) nextRouter.prefetch(href);
  }, [href]);
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
