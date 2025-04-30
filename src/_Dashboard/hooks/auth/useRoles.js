import { useEffect, useState } from "react";
import schemas from "../../configuration/schemas";
import { useAuth } from "@/contexts/AuthProvider";
import { getSchemaConfigByRole } from "./helpers";

/**
 * @typedef {typeof schemas[0]} SchemaItem
 */

/**
 * Custom hook to access role-based schema configuration based on the user's role.
 *
 * @returns {{
 *   collections: SchemaItem[],
 *   pages: SchemaItem[],
 *   components: SchemaItem[],
 *   private: SchemaItem[],
 *   isLoading: boolean,
 *   session: object|null
 * }}
 *
 * @example
 * ```jsx
 * import { useRoles } from "@/contexts/AuthorizationProvider";
 * const { collections, pages, components, private, isLoading } = useRoles();
 * ```
 */
const useRoles = () => {
  const [state, setState] = useState({
    collections: [],
    pages: [],
    components: [],
    private: [],
  });

  const { isLoading, session } = useAuth();
  const role = session?.role;

  useEffect(() => {
    if (!role) return;

    const newState = {
      collections: [],
      pages: [],
      components: [],
      private: [],
    };

    // Filter and categorize schemas based on the role
    schemas.forEach((item) => {
      const schemaConfig = getSchemaConfigByRole(item, role);
      if (schemaConfig && item.type) {
        newState[item.type].push(schemaConfig);
      }
    });

    setState(newState);
  }, [role]);

  return {
    ...state,
    isLoading,
    session,
  };
};

export default useRoles;
