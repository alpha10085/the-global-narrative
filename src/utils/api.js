import axios from "axios";
import { timeToMillis, timeToSeconds } from "./time";
import { SessionExpire } from "@/lib/actions";

const baseURL = `${process.env.NEXT_PUBLIC_API}/api`; // Replace with your API base URL
const timeout = 10 * 60 * 1000; // 10 minutes
export const csrApi = axios.create({
  baseURL, // Replace with your API base URL
  timeout, // 10 minutes, // Optional: Set a timeout for requests
  withCredentials: true, // Include credentials (cookies, authorization headers, TLS client certificates, etc.)
});
// Response Interceptor
csrApi.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  async (error) => {
    // Handle response errors and return custom errors
    if (error.response) {
      // Server responded with a status other than 2xx
      switch (error.response.status) {
        case 400:
          // Bad Request
          return Promise.reject({
            message: "Bad Request",
            ...error.response.data,
          });
        case 401:
          // Unauthorized
          return Promise.reject({
            message: "Unauthorized Access",
            ...error.response.data,
          });
        case 403:
          // Forbidden
          const channel = new BroadcastChannel("auth_channel");
          channel.postMessage({
            massage: "logout",
            path: "/log-in",
          });
          await SessionExpire().catch((err) => {});
          return Promise.reject({
            message: "session expierd",
            ...error.response.data,
            logout: true,
          });
        case 404:
          // Not Found
          return Promise.reject({
            message: "Resource Not Found",
            ...error.response.data,
          });
        case 500:
          // Internal Server Error
          return Promise.reject({
            message: "someThing wrong",
            ...error.response.data,
          });
        default:
          // Other statuses
          return Promise.reject({
            message: "An Error Occurred",
            ...error.response.data,
          });
      }
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: "No Response Received",
        errorBoundary: true,
      });
    } else {
      // Something happened in setting up the request
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

