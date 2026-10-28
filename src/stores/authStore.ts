import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  usuarioNombre: string | null;
  usuarioRol: string | null;
  usuarioAvatar: string | null;
  usuarioEmail: string | null;
  usuarioTelefono: string | null;
  autenticado: boolean;

  login: (token: string, nombre: string, rol: string) => void;
  actualizarPerfil: (
    nombre: string,
    avatar: string | null,
    email?: string,
    telefono?: string,
  ) => void;
  logout: () => void;
  esGerencia: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      usuarioNombre: null,
      usuarioRol: null,
      usuarioAvatar: null,
      usuarioEmail: null,
      usuarioTelefono: null,
      autenticado: false,

      login: (token, nombre, rol) =>
        set({
          token,
          usuarioNombre: nombre,
          usuarioRol: rol,
          autenticado: true,
        }),

      actualizarPerfil: (nombre, avatar, email, telefono) =>
        set({
          usuarioNombre: nombre,
          usuarioAvatar: avatar,
          ...(email !== undefined && { usuarioEmail: email }),
          ...(telefono !== undefined && { usuarioTelefono: telefono }),
        }),

      logout: () =>
        set({
          token: null,
          usuarioNombre: null,
          usuarioRol: null,
          usuarioAvatar: null,
          usuarioEmail: null,
          usuarioTelefono: null,
          autenticado: false,
        }),

      esGerencia: () => get().usuarioRol === "GERENCIA",
    }),
    { name: "clinica-auth-storage" },
  ),
);
