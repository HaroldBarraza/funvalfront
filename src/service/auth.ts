import { api } from "../libs/axios";
import type { LoginFormData } from "../schemas/loginSchema";

export type Rol = "RECEPCIONISTA" | "MEDICO" | "GERENCIA";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

interface LoginRespondeBack {
  token: string;
}

interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: Rol;
  iat: number;
  exp: number;
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

export async function login(datos: LoginFormData): Promise<LoginResponse> {
  const { data } = await api.post<LoginRespondeBack>("/auth/login", datos);
  if (!data || typeof data.token !== "string") {
    throw new Error("Erro del servidor al loguearse");
  }
  const payload = decodeJWT<JWTPayload>(data.token);

  return {
    token: data.token,
    usuario: {
      id: payload.id,
      nombre: payload.name,
      email: payload.email,
      rol: payload.role,
    },
  };
}
