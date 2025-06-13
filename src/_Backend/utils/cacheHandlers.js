import { timeToSeconds } from "@/utils/time.js";
import cache from "./cache";

export const getCoresegment = (key) => {
  try {
    return key?.match(/^\/api\/([^\/\?\s]+)/)?.[1] || "";
  } catch (error) {}
  return "";
};
export const cachePath = (key, value, stdTTL, admin = null) => {
  try {
    if (!key?.toString() || !value) return;
    let adminKey = admin ? `-admin` : "";
    let result = cache.set(`${key}${adminKey}`, value, stdTTL);
  } catch (error) {}
  return true;
};
export const cachPathes = (key, value, stdTTL, admin = null) => {
  try {
    let adminKey = admin ? `-admin` : "";
    let groupKey = `${getCoresegment(key)}${adminKey}`;
    let data = cache.get(groupKey) || {};
    data[`${key}${adminKey}`] = value;
    cache.set(groupKey, data, stdTTL);
  } catch (error) {}
  return true;
};
export const getCachedPath = (key, admin = null) => {
  try {
    let adminKey = admin ? `-admin` : "";
    let result =
      cache.get(`${key}${adminKey}`) ||
      cache.get(`${getCoresegment(key)}${adminKey}`)?.[`${key}${adminKey}`] ||
      null;
    return result;
  } catch (error) {}
  return null;
};
export const revaildatePath = (keys) => {
  try {
    let Allkeys = [...keys, ...keys?.map((key) => `${key}-admin`)].filter(
      Boolean
    );
    let result = cache.del(Allkeys);
    return result;
  } catch (error) {}
  return null;
};
export const updatetTTL = (key, sttl = "1h") => {
  try {
    let value = cache.get(key, timeToSeconds(sttl));
    if (value) {
      cache.ttl(key);
    }
  } catch (error) {}
  return true;
};
