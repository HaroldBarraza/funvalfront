import { useEffect, useState } from "react";

export function useDebounce<T>(valor: T, delay: 3000): T {
  const [debounce, setDebounce] = useState<T>(valor);

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(valor), delay);
    return () => clearTimeout(timer);
  }, [valor, delay]);
  return debounce;
}
