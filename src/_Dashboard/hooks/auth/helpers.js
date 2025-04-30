const defaultRoles = {
  view: false,
  create: false,
  update: false,
  delete: false,
  filter: false,
  sort: false,
  search: false,
  table: false,
  translation: false,
};
export const getSchemaConfigByRole = (item, role) => {
  const schema = { ...item.schema }; // Clone the schema object
  const { authorization = null } = schema;
  const defaultConfig = schema?.options?.roles;

  // Determine roles based on authorization and role
  const roles =
    authorization && role !== "admin" ? authorization?.roles?.[role] : {};
  // Create a new schema object with updated roles and without authorization
  const newItem = {
    ...item,
    schema: {
      ...schema,
      options: {
        ...schema.options,
        roles: { ...defaultRoles, ...defaultConfig, ...roles },
      },
    },
  };
  delete newItem.schema.authorization;
  if (!newItem?.schema?.options?.roles?.view) return null;
  return newItem;
};
