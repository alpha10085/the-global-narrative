export const calcReadingTime = (text = "") => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const totalSeconds = Math.floor((words / wordsPerMinute) * 60);

  if (totalSeconds < 60) {
    return `${totalSeconds} second${totalSeconds !== 1 ? "s" : ""}`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes < 60) {
    return seconds === 0
      ? `${minutes} minute${minutes !== 1 ? "s" : ""}`
      : `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} second${
          seconds !== 1 ? "s" : ""
        }`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes === 0
    ? `${hours} hour${hours !== 1 ? "s" : ""}`
    : `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${
        remainingMinutes !== 1 ? "s" : ""
      }`;
};
