import httpStatus from "@/_Backend/assets/messages/httpStatus";


export const authorized = (permissions) => {
  permissions = Array.isArray(permissions) ? permissions : [permissions];
  return (req, res, next) => {
    const user = req?.user;

    if (!permissions.length || permissions.includes("public")) return next();
    if (!permissions.includes(user?.role)) {
      next(httpStatus.unAuthorized);
    }
    return next();
  };
};
