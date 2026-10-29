import { useEffect, useState, useCallback } from "react";
import { extraerMensajeError } from "../libs/errorHandler";

interface UseApiResult<T> {
  data: T | null;
  cargando: boolean;
  error: string | null;
  recargar: () => void;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelado = false;

    setCargando(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (!cancelado) {
          setData(res);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (!cancelado) {
          setError(extraerMensajeError(err));
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [...deps, tick]);

  const recargar = useCallback(() => setTick((n) => n + 1), []);

  return { data, cargando, error, recargar };
}
