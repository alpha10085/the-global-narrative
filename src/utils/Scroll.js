export const scrollTo = (id) => {
    const section = document.querySelector(id);
  
    if (section) {
      // Scroll the section into view with smooth behavior
      section.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align to the start of the container
      });
    }
  };
  