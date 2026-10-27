import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { Rol } from "../service/auth";

interface RutaProtegidaProps {
    rolespermitidos?: Rol[]
}

export const RutaProtegida = ({rolespermitidos}: RutaProtegidaProps) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const usuario = useAuthStore((s) => s.usuario)

    if(!isAuthenticated){
        return<Navigate to="/login" replace />
    }
    if(rolespermitidos && usuario && !rolespermitidos.includes(usuario.rol)){
        return <Navigate to="/sin-acceso" replace />
    }
    return <Outlet/>
}