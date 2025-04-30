
const adminRoles = {
  admin: "admin",
};
const roles = {
  user: "user",
  ...adminRoles,
};
export const enumRoles = {
  ...roles,
  all: Object.values(roles),
  adminRoles: Object.values(adminRoles),
};

Object.freeze(enumRoles);
