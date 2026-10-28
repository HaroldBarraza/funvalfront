import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface RutaProtegidaProps {
  rolesPermitidos?: string[];
}

export const RutaProtegida = ({ rolesPermitidos }: RutaProtegidaProps) => {
  const autenticado = useAuthStore((s) => s.autenticado);
  const usuarioRol = useAuthStore((s) => s.usuarioRol);

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && usuarioRol && !rolesPermitidos.includes(usuarioRol)) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
};