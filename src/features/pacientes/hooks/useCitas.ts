import { useEffect } from "react";
import { useCitasStado } from "../../../stores/citasStoer";

export function useCitas(){
    const citas = useCitasStado((s) => s.citas) ?? []
    const cargando = useCitasStado((s) => s.cargando)
    const error = useCitasStado((s) => s.error)
    const cargarDatos = useCitasStado((s) => s.cargarTodas)
    const actualizarEstado = useCitasStado((s) => s.actualizarEstado)
    const agregarCitas = useCitasStado((s) => s.agregarCita)

    useEffect(() => {
        cargarDatos()
    }, [])
    return {
        citas,
        cargando,
        error,
        recarga:cargarDatos,
        actualizarEstado,
        agregarCitas,
    }
}