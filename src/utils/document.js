export const hideElement = (key) => {
  const element = document.querySelector(key);
  if (element) {
    element.style.display = "none";
  }
};
export const showElement = (key, { display = "flex" } = {}) => {
  if (
    display === "none" ||
    !["flex", "block", "inline", "inline-block"].includes(display)
  ) {
    display = "block";
  }
  const element = document.querySelector(key);
  if (element) {
    element.style.display = display;
  }
};

export const scrollToElement = (key, headerOffset = 0) => {
  const element = document.querySelector(key);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
