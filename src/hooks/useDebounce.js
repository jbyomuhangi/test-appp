import { useCallback, useEffect, useRef } from "react";

import { empty } from "@/utils/noOpUtils";
import useValueRef from "./useValueRef";

const useDebounce = ({ delay = 1000, func = empty }) => {
  const timer = useRef();
  const funcRef = useValueRef(func);

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = useCallback(
    (...args) => {
      clearTimeout(timer.current);

      const newTimer = setTimeout(() => {
        funcRef.current(...args);
      }, delay);

      timer.current = newTimer;
    },
    [funcRef, delay]
  );

  return debouncedFunction;
};

export default useDebounce;
