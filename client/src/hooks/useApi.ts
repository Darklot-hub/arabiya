import { useCallback, useState } from "react";
import { api } from "../services/api";

export function useApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useCallback(async (path: string, options?: RequestInit) => {
    setLoading(true);
    setError("");
    try {
      return await api<T>(path, options);
    } catch (e) {
      const m = e instanceof Error ? e.message : "Ошибка";
      setError(m);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  return { request, loading, error };
}
