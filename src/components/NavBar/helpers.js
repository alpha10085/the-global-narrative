"use client"
import { links } from "./Links";
export const enabledLinks = links?.filter(
  (val) => (typeof val?.enabled && val?.enabled) || val?.enabled === undefined
);

export const videoKey = "landing-video"