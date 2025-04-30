import { generateInitialize } from "@/_Dashboard/lib/dashboard";
import {
  collectErrorPaths,
  handleReplaceDot,
} from "@/_Dashboard/utils/handleData";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/time";
import { useEffect } from "react";



export const useFetch = (slug) => {
  const [state, setState] = useDynamicState({
    isLoading: true,
    error: null,
    data: null,
  });

  const { isLoading, error, data } = state;

  useEffect(() => {
    const fetchData = async () => {
      setState({ isLoading: true, error: null, data: null });
      try {
        const response = await generateInitialize({
          queryKey: ["", slug],
        });
        setState({ isLoading: false, error: null, data: response });
      } catch (err) {
        setState({ isLoading: false, error: err, data: null });
      }
    };
    if (slug) {
      fetchData();
    }
  }, []); // Ensure updates occur when slug or setState changes

  return { isLoading, error, data };
};
export const scrollToSection = (id) => {
  const container = document.querySelector("#popupaddnewmain");
  const section = document.querySelector(id);

  if (container && section) {
    // Calculate the section's position relative to the container
    const elementPosition = section.offsetTop - container.offsetTop;
    const offsetPosition = elementPosition - 50; // Apply the offset

    // Scroll the container to the calculated position
    container.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
export const scrollToErrorElemntry = async (e) => {
  const firstKey = collectErrorPaths(e)?.[0];
  if (!firstKey) return;
  await delay(200);
  scrollToSection(`#${handleReplaceDot(firstKey, ".", "-")}`, 85);
};
