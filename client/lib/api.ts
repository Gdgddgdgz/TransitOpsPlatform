import { useAuth } from "@clerk/nextjs";
import { useCallback, useMemo } from "react";
import api from "./axios";

export function useApi() {
  const { getToken } = useAuth();

  const getAuthHeaders = useCallback(async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getToken]);

  return useMemo(() => ({
    getAuthHeaders,
    get: async <T = unknown>(url: string) => {
      const headers = await getAuthHeaders();
      const res = await api.get<T>(url, { headers });
      return res.data;
    },
    post: async <T = unknown>(url: string, data?: unknown) => {
      const headers = await getAuthHeaders();
      const res = await api.post<T>(url, data, { headers });
      return res.data;
    },
    put: async <T = unknown>(url: string, data?: unknown) => {
      const headers = await getAuthHeaders();
      const res = await api.put<T>(url, data, { headers });
      return res.data;
    },
    del: async <T = unknown>(url: string) => {
      const headers = await getAuthHeaders();
      const res = await api.delete<T>(url, { headers });
      return res.data;
    },
  }), [getAuthHeaders]);
}
