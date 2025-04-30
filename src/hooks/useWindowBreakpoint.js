import { useState, useEffect } from "react";

const useWindowBreakpoint = (
  breakpoints = { mobile: 400, tablet: 768, desktop: 1024 }
) => {
  const [activeBreakpoint, setActiveBreakpoint] = useState(null);

  useEffect(() => {
    // Ensure it runs only on the client side
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint = null;

      // Find the matching breakpoint dynamically
      for (const [key, value] of Object.entries(breakpoints)) {
        if (width < value) {
          newBreakpoint = key;
          break;
        }
      }
      if (!newBreakpoint) newBreakpoint = "desktop"; // Default if none matched

      setActiveBreakpoint((prev) =>
        prev === newBreakpoint ? prev : newBreakpoint
      );
    };

    // Set initial value
    handleResize();

    // Add and clean up the resize event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return activeBreakpoint;
};

export default useWindowBreakpoint;
