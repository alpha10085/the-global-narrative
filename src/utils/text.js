export const formatText = (
  text = "",
  { br = true, bold = true, link = true } = {}
) => {

  console.log(text);
  
  // Replace .with new lines with <br/>
  let formattedText = text;
  if (br) {
    formattedText = text?.replace(/\n/g, "<br/>");
  }
  if (bold) {
    formattedText = formattedText?.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    // Replace * * with bold markers with <strong> tags
  }

  if (link) {
    // Replace markdown-style links [displayName](url) with <a> tags
    formattedText = formattedText?.replace(
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

export const lineBreak = (text = "", symbol = ".", remove = true) => {
  // Replace all occurrences of $$ with <br />
  const regex = new RegExp(symbol, "g");
  if (remove) {
    //  return text.replace(regex, '');
  }
  let lines = text?.split(regex);
  return lines
    ?.map((line, index) => {
      return index === lines.length - 1 ? line : `${line}${symbol}<br />`;
    })
    .join("");
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

export const customText = (text = "", length = 1) => {
  if (text?.length > length && length >= 4) {
    return text.slice(0, length - 3) + "...";
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
