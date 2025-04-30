export const isValidDomainFormat = (inputDomain, currentvalues) => {
  // Regular expression to validate domain format (e.g., example.com, sub.example.com)
  const domainRegex =
    /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  const isValid = domainRegex.test(inputDomain);
  if (!isValid) {
    return { valid: false, message: "is not a valid domain format" };
  }

  if (currentvalues?.includes(inputDomain)) {
    return { valid: false, message: "this domain already exsists." };
  }

  return { valid: true, message: null };
};
export const validatePageName = (name, usedList = [], children = []) => {
  if (!name) return { valid: false, message: "Page name cannot be empty." };

  if (usedList.includes(name)) {
    return { valid: false, message: "Page name is already used." };
  }
  if (children.find((val) => val?.name?.includes("["))) {
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

  return { valid: true, message: null };
};
