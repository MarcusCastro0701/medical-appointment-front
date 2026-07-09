import { api } from "./client";

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export const authApi = {
  signup: (data: SignupPayload) => api.post<AuthResponse>("/auth/signup", data),
  signin: (data: SigninPayload) => api.post<AuthResponse>("/auth/signin", data),
  logout: () => api.post<void>("/auth/logout"),
};
