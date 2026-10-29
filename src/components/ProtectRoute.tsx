import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";

interface PotectRouteProps {
    children : ReactNode
}

export const ProtecRoute = ({children}: PotectRouteProps) => {
    const isAuthenticated = useAuthStore((s) => s.autenticado)
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return <>{children}</>
}