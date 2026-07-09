import axios, { AxiosError } from "axios";

export const TOKEN_STORAGE_KEY = "medical-appointment.token";
export const EMAIL_STORAGE_KEY = "medical-appointment.email";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isUnauthorized = axios.isAxiosError(err) && err.response?.status === 401;
    const isOnAuthPage = window.location.pathname === "/login" || window.location.pathname === "/signup";
    if (isUnauthorized && !isOnAuthPage) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(EMAIL_STORAGE_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

type ApiErrorBody = {
  error?: string;
  message?: string;
  details?: unknown;
};

/** Extracts a human-readable message from a failed API call, following the backend's `{ error, message, details }` error contract. */
export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<ApiErrorBody>;

    if (!axiosErr.response) {
      return "Couldn't reach the server. Check your connection and try again.";
    }

    if (axiosErr.response.status === 429) {
      return "Too many attempts. Please wait a minute and try again.";
    }

    return axiosErr.response.data?.message ?? fallback;
  }

  return fallback;
}
