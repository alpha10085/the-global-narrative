
export const validateComponentName = (name, usedList = []) => {
  if (!name)
    return { valid: false, message: "Component name cannot be empty." };

  if (usedList.includes(name)) {
    return { valid: false, message: "Component name is already used." };
  }

  if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
    return {
      valid: false,
      message:
        "Component name must start with an uppercase letter and contain only letters and numbers.",
    };
  }

  if (/[^A-Za-z0-9]/.test(name)) {
    return {
      valid: false,
      message: "Component name can only contain letters and numbers.",
    };
  }

  return { valid: true, message: null };
};
