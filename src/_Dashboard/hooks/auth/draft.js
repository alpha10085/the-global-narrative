
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getSchemaConfigByRole } from "./helpers";
import schemas from "@/_Dashboard/configuration/schemas";

/**
 * @typedef {typeof schemas[0]} SchemaItem
 */
const AuthorizationContext = createContext();

const init = {
  collections: [],
  pages: [],
  components: [],
  private: [],
};

const AuthorizationProvider = ({ children }) => {
  const [state, setState] = useState(init);
  const { isLoading, session } = useAuth();

  // Destructure role safely with fallback to null
  const role = session?.role || null;

  useEffect(() => {
    if (role) {
      const newState = { ...init };
      // Use forEach since we're not using the return value
      schemas.forEach((item) => {
        const newItem = getSchemaConfigByRole(item, role);
        if (newItem && item?.type) {
          newState[item.type] = [...(newState[item.type] || []), newItem];
        }
      });

      setState(newState);
    }
  }, [role]);

  // Adding additional checks here to ensure no undefined state is passed
  const props = {
    collections: state.collections || [],
    pages: state.pages || [],
    components: state.components || [],
    private: state.private || [],
    isLoading,
    session,
    schemas: [
      ...(state.collections || []),
      ...(state.components || []),
      ...(state.pages || []),
      ...(state.private || []),
    ],
  };

  return (
    <AuthorizationContext.Provider value={props}>
      {children}
    </AuthorizationContext.Provider>
  );
};

/**
 * **Hook to access Authorization Context values**
 *
 * @returns {{
 *  collections: SchemaItem[],
 *  pages: SchemaItem[],
 *  components: SchemaItem[],
 *  private: SchemaItem[],
 *  isLoading: boolean,
 *  session: object,
 *  schemas: SchemaItem[]
 * }}
 *
 * @example
 * ```jsx
 * import { useRoles } from "@/contexts/AuthorizationProvider";
 * const { collections, pages, components, private, isLoading } = useRoles();
 * ```
 */
export const useRoles = () => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error("useRoles must be used within an AuthorizationProvider");
  }

  return context;
};

export default AuthorizationProvider;
