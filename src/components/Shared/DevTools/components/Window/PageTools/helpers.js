export const validatePageName = (name, usedList = [], children = []) => {
  if (!name) return { valid: false, message: "Page name cannot be empty." };

  if (usedList.includes(name)) {
    return { valid: false, message: "Page name is already used." };
  }
  if (name?.includes("[") && children.find((val) => val?.name?.includes("["))) {
    return {
      valid: false,
      message: " You cannot use different dynamic path in same level",
    };
  }

  if (/^\d/.test(name)) {
    return { valid: false, message: "Page name cannot start with a number." };
  }

  if (/[A-Z]/.test(name)) {
    return {
      valid: false,
      message: "Page name cannot contain uppercase letters.",
    };
  }

  if (name.includes("/")) {
    return { valid: false, message: "Page name cannot contain '/'." };
  }

  if (/^[-_]/.test(name) || /[-_]$/.test(name)) {
    return {
      valid: false,
      message: "Page name cannot start or end with '-' or '_'.",
    };
  }

  // Disallow '-' and '_' inside [param]
  if (/^\[[^\]]*[-_][^\]]*\]$/.test(name)) {
    return {
      valid: false,
      message: "Page name inside '[ ]' cannot contain '-' or '_'.",
    };
  }

  // Allow only valid names or full dynamic routes `[param]`
  if (!/^[a-z0-9\-_]+$/.test(name) && !/^\[[a-z0-9]+\]$/.test(name)) {
    return {
      valid: false,
      message:
        "Page name contains invalid characters. Only lowercase letters, numbers, '-', '_', and '[param]' are allowed.",
    };
  }

  return { valid: true, message: null };
};
