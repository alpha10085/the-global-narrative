import { useCallback, useState } from "react";

/**
 * A custom hook for managing dynamic state.
 * @template T
 * @param {T} initialState - The initial state object.
 * @returns {[T, (updates: Partial<T>) => void, () => void, React.Dispatch<React.SetStateAction<T>>]}
 */
const useDynamicState = (initialState) => {
  const [state, setState] = useState(initialState);

  /**
   * Updates the state with new values.
   * @param {Partial<T>} updates - An object with the updates to apply.
   */
  const updateState = useCallback(
    (updates) => {
      setState((prev) => ({ ...prev, ...updates }));
    },
    [setState]
  );

  /**
   * Resets the state to its initial value.
   */
  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);
  return [state, updateState, resetState, setState];
};

export default useDynamicState;
