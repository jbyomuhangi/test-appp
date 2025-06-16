import { useEffect, useRef } from "react";

import { empty } from "@/utils/noOpUtils";
import useValueRef from "./useValueRef";

const useResizeObserver = ({
  ref: customRef,
  ignoreResize = false,
  callback = empty,
} = {}) => {
  const ref = useRef();
  const callbackRef = useValueRef(callback);

  useEffect(() => {
    const element = customRef?.current || ref?.current;
    if (!element) return;
    if (ignoreResize) return;

    const observer = new ResizeObserver(() => {
      callbackRef.current(element);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, customRef, callbackRef, ignoreResize]);

  return customRef || ref;
};

export default useResizeObserver;
