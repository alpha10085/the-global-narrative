"use client";

import dynamic from "next/dynamic";

const DevTools = dynamic(() => import("./DevTools"), { ssr: false });

const DevToolsClient = ({ children, logStore }) => (
  <DevTools logStore={logStore}>{children}</DevTools>
);

export default DevToolsClient;
