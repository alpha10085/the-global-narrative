import axios from "axios";
import { SessionExpire } from "@/lib/actions";
import eventBus from "./eventBus";
import { timeToSeconds } from "./time";

const baseURL = `${process.env.NEXT_PUBLIC_API}/api`;
const timeout = 10 * 60 * 1000;

export const csrApi = axios.create({
  baseURL,
  timeout,
  withCredentials: true,
});

// Helper: retry GET requests
const retryRequest = async (error, retries = 2) => {
  console.log("retrying: ", error.config);
  const config = error.config;
  if (!config || config.__retryCount >= retries || config.method !== "get") {
    return null;
  }

  config.__retryCount = (config.__retryCount || 0) + 1;
  try {
    return await csrApi(config);
  } catch (err) {
    return retryRequest(err, retries);
  }
};

// Interceptor
csrApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject({
            message: "Bad Request",
            ...error.response.data,
          });
        case 401:
          return Promise.reject({
            message: "Unauthorized Access",
            ...error.response.data,
          });
        case 403:
          const channel = new BroadcastChannel("auth_channel");
          channel.postMessage({ massage: "logout", path: "/log-in" });
          await SessionExpire().catch(() => {});
          return Promise.reject({
            message: "session expired",
            ...error.response.data,
            logout: true,
          });
        case 404:
          return Promise.reject({
            message: "Resource Not Found",
            ...error.response.data,
          });
        case 500:
          return Promise.reject({
            message: "Something went wrong",
            ...error.response.data,
          });
        default:
          return Promise.reject({
            message: "An Error Occurred",
            ...error.response.data,
          });
      }
    } else if (error.request) {
      const retriedResponse = await retryRequest(error);
      if (retriedResponse) return retriedResponse;

      const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
      if (isOffline) {
        eventBus.emit("offline-mode", true);
      } else {
        eventBus.emit("server-down", true);
      }
      return Promise.reject({
        message: isOffline ? "You are offline" : "No Response Received",
        errorBoundary: !isOffline,
        offline: isOffline,
      });
    } else {
      return Promise.reject({
        message: "Request Error",
        details: error.message,
      });
    }
  }
);

/**
 * Makes an API request with server-side rendering (SSR) support, handling common use cases like timeouts, method selection, and error handling.
 *
 * @param {string} url - The endpoint to make the request to, relative to the baseURL.
 * @param {Object} [options={}] - Optional parameters to customize the request.
 * @param {string} [options.method="GET"] - HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE").
 * @param {Object} [options.body] - The payload to send with the request. This is automatically stringified if provided.
 * @param {Object} [options.next] - Next.js ISR (Incremental Static Regeneration) options.
 * @param {number} [options.next.revalidate] - Time in seconds to revalidate the page. If set, the page will be revalidated after this time period.
 * @param {Array} [options.next.tags] - An array of tags used for ISR or caching purposes.
 * @param {string} [options.cache] - The cache control option for the request (e.g., "no-store", "reload").
 * @param {number} [timeout=20000] - The timeout duration in milliseconds before the request is aborted. Default is 20000ms.
 *
 * @returns {Promise<Object>} The parsed JSON response from the API.
 * @throws {Object} An error object with a message and optional details, which can include logout and errorBoundary flags.
 */
export const ssrApi = async (url, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const { method = "GET", body, next = {} } = options;
  if (next.revalidate) next.revalidate = timeToSeconds(next.revalidate);
  try {
    const response = await fetch(`${baseURL}${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      next:
        process.env.NEXT_PUBLIC_MODE === "dev"
          ? {
              revalidate: 0,
            }
          : next, // Pass the ISR options to fetch, or an empty object
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "An error occurred" }));
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    if (error?.name === "AbortError") {
      throw { message: "Request Timeout", errorBoundary: true };
    } else {
      throw { message: "Request Error", details: error.message };
    }
  } finally {
    clearTimeout(id);
  }
};

class AppError extends Error {
  constructor(e) {
    super(JSON?.stringify(e));
  }
}
export function AsyncHandler(fn, { ssr = false, onError = "throw" } = {}) {
  return (...args) => {
    return fn(...args).catch((error) => {
      let errorssr = new AppError(error);
      if (onError === "throw") {
        throw ssr ? errorssr : error;
      } else {
        return onError(error, ...args);
      }
    });
  };
}
