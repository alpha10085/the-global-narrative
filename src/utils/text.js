export const formatText = (
  text = "",
  { br = true, bold = true, link = true, dotBreak = false } = {}
) => {
  let formattedText = text;

  if (br) {
    formattedText = formattedText.replace(/\n/g, "<br/>");
  }

  if (dotBreak) {
    // Add <br/> after periods followed by a space (but not if inside abbreviations like "U.S.")
    formattedText = formattedText.replace(/\. (?=[A-Z])/g, ".<br/><br/>");
  }

  if (bold) {
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  }

  if (link) {
    formattedText = formattedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, displayName, url) => {
        return `<a href="${url}" target="_blank" style="text-decoration: underline;" rel="noopener noreferrer">${displayName}</a>`;
      }
    );
  }

  return formattedText;
};


export const textDir = (value = null) => {
  try {
    if (value === null) return "auto";
    value = value?.toString()?.trim();
    const isRTL = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(value);
    return isRTL ? "rtl" : "ltr";
  } catch (error) {
    return "auto";
  }
};

export const lineBreak = (text = "", symbols = ["."], remove = false) => {
  if (!text) return [];

  // Escape regex special characters
  const escaped = symbols.map((s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

  // Build dynamic regex: split after any symbol followed by spaces
  const splitRegex = new RegExp(`(?<=${escaped.join('|')})\\s+`);

  // Build dynamic removal regex: remove any of the symbols at the end
  const endSymbolRegex = new RegExp(`(${escaped.join('|')})$`);

  return text
    .split(splitRegex)
    .map((line) => {
      const trimmed = line.trim();
      return remove ? trimmed.replace(endSymbolRegex, "") : trimmed;
    })
    .filter((line) => line.length > 0);
};


export const formatTextWithLineBreaks = (text = "") => {
  return text
    .split(". ")
    .filter(Boolean) // Remove empty segments
    .map(
      (segment, index) => (index === 0 ? segment : `${segment}.`) // Add period back except for the first segment
    )
    .join("<br/><br/>"); // Add line breaks between segments
};

export const generateRandomText = (length = 4) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }
  return randomText;
};

export const customText = (text = "", length = 5, prefix = "...") => {
  if (text?.length > length && length >= 4) {
    return text.slice(0, length - prefix.length) + prefix;
  }
  return text;
};
export const formatTextWithHyphens = (text) => {
  let result = "";
  for (let i = 0; i < (text?.length || 1); i++) {
    if (i % 4 == 0 && i < text.length && i > 0) {
      result += "-";
    }
    result += text[i];
  }
  return result;
};
export const removeSpecificWords = (text = "", ...wordsToRemove) => {
  // Create a regular expression pattern from the words to remove
  const pattern = new RegExp("\\b(" + wordsToRemove.join("|") + ")\\b", "gi");
  // Replace the words in the text with an empty string
  return text
    .replace(pattern, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};
export const searchAndReplace = (text = "", symbol = "", replacement = "") => {
  // Use regular expression to replace all occurrences of the symbol
  const regex = new RegExp(symbol, "g");
  const newText = text.replace(regex, replacement);
  return newText;
};
export const highlightWord = (text = null) => {
  if (!text) return "";

  // Regex to match words surrounded by * or ** (handles bold and italic)
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;

  return text.replace(regex, (match, _, boldText, italicText) => {
    if (boldText) {
      return `<span class="bold">${boldText}</span>`; // **bold**
    } else if (italicText) {
      return `<span class="italic">${italicText}</span>`; // *italic*
    }
    return match;
  });
};

export const handleReplaceDot = (text = "") => {
  // Remove dots (.), brackets ([]), and spaces
  let result = text.replace(/[\.\[\]\s]+/g, "");

  // Ensure the ID starts with a letter; if not, prepend "id_"

  return result;
};
