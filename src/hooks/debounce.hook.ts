import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 520) => {
  const [mainValue, setMainValue] = useState<T>(value);

  useEffect(() => {
    const timerCloser = setTimeout(() => {
      setMainValue(value);
    }, delay);

    return () => {
      clearTimeout(timerCloser);
    };
  }, [value, delay]);

  return mainValue;
};

export default useDebounce;
