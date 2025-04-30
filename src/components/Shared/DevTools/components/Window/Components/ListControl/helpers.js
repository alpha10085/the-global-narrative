// Add helper functions here
export const validateVariable = (state = {}) => {
  if (!state?.addNewVal?.key || state?.addNewVal?.key?.length < 3) {
    return false;
  }

  if (!state?.addNewVal?.value || state?.addNewVal?.value?.length < 3) {
    return false;
  }
  if (state?.data?.[state?.addNewVal?.key]) {
    return false;
  }
  return true;
};

export const validateVariableName = (key, current) => {
  const existing = current[key];

  if (!key || key.length < 3) {
    return {
      valid: false,
      message: "Variable name must be at least 3 characters long.",
    };
  }
  if (existing) {
    return {
      valid: false,
      message: `A variable with the name "${key}" already exists.`,
    };
  }

  return { valid: true, message: null };
};
export const validateVariableValue = (value) => {
  
    if (!value || value?.length < 3) {
      return {
        valid: false,
        message: "Variable value must be at least 3 characters long.",
      };
    }

    return { valid: true, message: null };
  };
