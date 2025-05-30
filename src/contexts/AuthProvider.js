"use client";
import { getProfile, handleLogout, signAPI } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import LogOutCover from "@/components/Auth/LogOutCover/LogOutCover";
import { useErrorBoundary } from "./ErrorBoundryCTX";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { isAdmin } from "@/config/auth";
import translation from "@/i18n/config";

// Creating context for authentication
const AuthContext = createContext("AuthContext");

/**
 * AuthProvider component that manages and provides authentication-related state and actions.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render inside the provider.
 * @param {string} [props.locale="en"] - The locale to use for authentication (default is "en").
 *
 * @returns {JSX.Element} The Auth Context provider with authentication functions and state.
 */
export const AuthProvider = ({ children, locale = "en" }) => {
  const [session, setSession] = useState(null);
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  /**
   * Destroys the current session and redirects to a specified path.
   *
   * @param {string} [path="/"] - The path to navigate to after logout (default is "/").
   */
  const destroySession = async (path = "") => {
    try {
      const locale = Cookies.get("locale");
      setIsLoggingOut(true);
      setSession(null);
      queryClient.clear();
      router.replace(`/${translation?.route ? locale : ""}${path}`);
      router.refresh();
    } catch (error) {}
  };

  /**
   * Updates the session with new data?.
   *
   * @param {Object} data - The new session data to update.
   */
  const updateSession = useCallback((data) => {
    setSession(data);
  }, []);

  /**
   * Logs out the user by calling the logout API and broadcasting a logout message.
   */
  const logOut = useCallback(async () => {
    const channel = new BroadcastChannel("auth_channel");
    try {
      router.prefetch(`/${locale}`);
      setIsLoggingOut(true);
      await handleLogout();
      channel.postMessage({
        message: "logout",
        path: "",
      });
    } catch (error) {
      channel.postMessage({
        message: "logout",
        path: "",
      });
    }
  }, []);

  /**
   * Signs the user in using the provided credentials.
   *
   * @param {Object} params - The parameters for signing in.
   * @param {Object} [params.data={}] - The data to send for sign-in.
   * @param {string} [params.mood="signin"] - The sign-in mood (default is "signin").
   */
  const signIn = useCallback(
    async ({ data = {}, mood = "signin" }) => {
      try {
        const {
          profile = {},
          message = null,
          boundary = {},
        } = await signAPI(data, mood, locale);
        setSession(profile);
        !isAdmin(profile) &&
          toast.success(`${message || "logged in successfully!"}`);
        queryClient.clear();
      } catch (error) {
        if (error?.logout) {
          logOut();
        } else if (error?.errorBoundary) {
          showBoundary();
        } else {
          throw error?.message;
        }
      }
    },
    [locale]
  );

  /**
   * Verifies the user's session by fetching profile data?.
   */
  const verfiySession = async () => {
    try {
      setIsLoading(true);
      const { profile = null } = await getProfile();
      setSession(profile);
    } catch (error) {
      if (error?.errorBoundary) {
        showBoundary();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Create the BroadcastChannel
    const channel = new BroadcastChannel("auth_channel");
    // Listen for messages (e.g., logout event)
    channel.onmessage = (event) => {
      if (event?.data?.message === "logout") {
        destroySession(event?.data?.path);
      }
    };
   // verfiySession();
    return () => {
      // Clean up: Close the channel when the component unmounts
      channel.close();
    };
  }, []);
  const AuthContextProps = {
    session,
    isLoading,
    isLoggingOut,
    reVerfiy: verfiySession,
    signIn,
    logOut,
    updateSession,
    destroySession,
  };

  return (
    <AuthContext.Provider value={AuthContextProps}>
      {isLoggingOut ? (
        <LogOutCover OnFinish={() => setIsLoggingOut(false)} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context values.
 *
 * @returns {{
 *   session: Object | null,
 *   isLoading: boolean,
 *   isLoggingOut: boolean,
 *   reVerfiy: Function,
 *   signIn: Function,
 *   logOut: Function,
 *   updateSession: Function,
 *   destroySession: Function
 * }} The authentication context values and actions.
 *
 * @example
 * const { session, isLoading, signIn, logOut } = useAuth();
 * signIn({ data: { username: 'user', password: 'pass' } }); // Sign the user in
 * logOut(); // Logs the user out
 */
export const useAuth = () => {
  const {
    session = null,
    isLoading = false,
    isLoggingOut = false,
    reVerfiy = () => {},
    signIn = () => {},
    logOut = () => {},
    updateSession = () => {},
    destroySession = () => {},
  } = useContext(AuthContext);
  return {
    session,
    isLoading,
    isLoggingOut,
    reVerfiy,
    signIn,
    logOut,
    updateSession,
    destroySession,
  };
};
