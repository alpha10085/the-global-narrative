
export const getLabelsByKeys = ({ fields = [], view = [] }) => {
  const predefinedKeys = {
    createdAt: {
      key: "createdAt",
      label: "createdAt",
      type: "date",
      format: "dateAgo",
    },
    updatedAt: {
      key: "updatedAt",
      label: "lastUpdatedAt",
      type: "date",
      format: "dateAgo",
    },
    _id: {
      key: "_id",
      label: "id",
      type: "text",
    },
  };

  const findLabel = (fieldArray, nestedKey) => {
    const [currentKey, ...remainingKeys] = nestedKey.split(".");
    const field = fieldArray.find((f) => f.name === currentKey);
    return field && remainingKeys.length
      ? findLabel(field.fields || [], remainingKeys.join("."))
      : field;
  };

  return view
    ?.map((key) => {
      if (typeof key === "object") {
        return { ...key };
      }
      if (predefinedKeys[key]) {
        return predefinedKeys[key];
      }
      const label = findLabel(fields, key);
      return label ? { ...label, key } : null;
    })
    ?.filter(Boolean);
};

