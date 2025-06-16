import { useRef } from "react";

const useValueRef = (value) => {
  const valueRef = useRef();
  valueRef.current = value;

  return valueRef;
};

export default useValueRef;
