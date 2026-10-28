import { api } from "../libs/axios";

export interface PerfilFormData {
  nombre: string;
  email: string;
  telefono?: string;
}

export interface UserProfile {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  telefono?: string;
  fotoPerfil?: string;
}

interface PerfilResponse {
  usuario: UserProfile;
}

export const perfilService = {
  obtener: () =>
    api.get<PerfilResponse>("/auth/me").then((r) => r.data.usuario),

  actualizar: (datos: PerfilFormData, foto?: File) => {
    const formData = new FormData();
    formData.append("nombre", datos.nombre);
    formData.append("email", datos.email);
    if (datos.telefono) formData.append("telefono", datos.telefono);
    if (foto) formData.append("foto", foto);
    return api
      .put<PerfilResponse>("/auth/perfil", formData)
      .then((r) => r.data.usuario);
  },
};