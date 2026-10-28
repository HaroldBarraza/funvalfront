import { api } from "../libs/axios";
import type { LoginFormData } from "../schemas/loginSchema";

interface LoginBackend {
  token: string;
}

interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  rol: string;
}

const decodeJWT = <T>(token: string): T => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload) as T;
};

export const authService = {
  login: async (datos: LoginFormData): Promise<LoginResponse> => {
    const { data } = await api.post<LoginBackend>("/auth/login", datos);

    if (!data || typeof data.token !== "string") {
      throw new Error("Respuesta inválida del servidor");
    }

    const payload = decodeJWT<JWTPayload>(data.token);

    return {
      token: data.token,
      nombre: payload.name,
      rol: payload.role,
    };
  },
};