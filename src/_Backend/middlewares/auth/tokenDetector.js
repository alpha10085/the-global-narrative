import httpStatus from "@/_Backend/assets/messages/httpStatus";
import { getUserAndVerify } from "@/_Backend/modules/_constant/auth/auth.services";
import { HttpStatusCode } from "axios";

/**
 * Middleware to verify token and role-based access.
 * @param {Object} config - Configuration object for allowed roles.
 * @returns {Function} Express middleware function.
 */
export const tokenDetector = (config) => {
  return async (req, res, next) => {
    try {
      const { decoded } = req;
      const allowedRoles = Object.keys(config || {}).filter(
        (role) => config[role] && role !== "public"
      );

      // Check if the decoded role is allowed
      if (!allowedRoles.length || !decoded) {
        return next();
      }
      // Verify the user
      const user = await getUserAndVerify(decoded);
      if (!user) {
        return next(httpStatus.Forbidden);
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
