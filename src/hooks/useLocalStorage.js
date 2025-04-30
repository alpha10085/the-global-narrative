import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadStorage = () => {
      const data = JSON.parse(localStorage.getItem(key)) || null;
      setState({ data, isLoading: false });
    };

    loadStorage();

    // Listen to localStorage changes from other tabs
    const handleStorageEvent = (e) => {
      if (e.key === key) loadStorage();
    };

    // Listen to custom events in the same tab
    const handleCustomEvent = (e) => {
      if (e.detail === key) loadStorage();
    };

    window.addEventListener("storage", handleStorageEvent);
    document.addEventListener("localStorageChange", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      document.removeEventListener("localStorageChange", handleCustomEvent);
    };
  }, [key]);

  const notifyChange = () => {
    document.dispatchEvent(
      new CustomEvent("localStorageChange", { detail: key })
    );
  };

  const createOrUpdate = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState({ data: value, isLoading: false });
    notifyChange(); // 🔁 notify other hook instances in same tab
  };

  const remove = () => {
    localStorage.removeItem(key);
    setState({ data: null, isLoading: false });
    notifyChange(); // 🔁 notify other hook instances in same tab
  };

  return { ...state, createOrUpdate, remove };
};

export default useLocalStorage;
