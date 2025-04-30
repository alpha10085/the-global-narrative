import { useEffect, useRef } from "react";

export const useClickOut = ({ BtnRemoteRef, onClickOutside = () => {} }) => {
  const ref = useRef(null);
  const onClickOutsideRef = useRef(onClickOutside);

  // Keep ref updated without triggering re-renders
  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const A = ref.current;
      const B = BtnRemoteRef?.current;

      const condition =
        A && B
          ? !A.contains(event.target) && !B.contains(event.target)
          : !A?.contains(event.target);

      if (condition) {
        onClickOutsideRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [BtnRemoteRef]); // only changes if BtnRemoteRef changes

  return { ref };
};
