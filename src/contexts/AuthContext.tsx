import { createContext, useContext, useState, type ReactNode } from "react";
import { authApi } from "../api/auth";
import { EMAIL_STORAGE_KEY, TOKEN_STORAGE_KEY } from "../api/client";

type AuthContextValue = {
  isAuthenticated: boolean;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem(EMAIL_STORAGE_KEY));

  function login(newToken: string, newEmail: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    localStorage.setItem(EMAIL_STORAGE_KEY, newEmail);
    setToken(newToken);
    setEmail(newEmail);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(EMAIL_STORAGE_KEY);
      setToken(null);
      setEmail(null);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
