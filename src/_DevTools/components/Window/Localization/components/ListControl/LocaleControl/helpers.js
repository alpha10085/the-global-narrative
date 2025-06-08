export const validateLocaleLabel = (label, usedLabels = []) => {
  console.log("🚀 ~ validateLocaleLabel ~ usedLabels:", usedLabels)
  if (!label) return { valid: false, message: "Label is required." };

  if (label.length < 2)
    return { valid: false, message: "Label must be at least 2 characters." };

  if (label.length > 20)
    return { valid: false, message: "Label must be less than 20 characters." };

  if (usedLabels.some((l) => l.toLowerCase() === label.toLowerCase()))
    return { valid: false, message: "Label already exists." };

  return { valid: true, message: null };
};

export const validateLocaleCode = (code, usedCodes = []) => {
  console.log("🚀 ~ validateLocaleCode ~ usedCodes:", usedCodes)
  if (!code) return { valid: false, message: "Locale code is required." };

  if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(code))
    return { valid: false, message: "Use format like 'en' or 'en-US'." };

  if (code.length < 2 || code.length > 5)
    return { valid: false, message: "Code must be 2–5 characters." };

  if (usedCodes.includes(code.toLowerCase()))
    return { valid: false, message: "Locale code already exists." };

  return { valid: true, message: null };
};
