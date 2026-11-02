import { useEffect } from "react";
import { usePacienteStore } from "../../../stores/pacientesstore";

export function usePacientes() {
  const pacientes = usePacienteStore((s) => s.paciente) ?? [];
  const cargando = usePacienteStore((s) => s.cargando);
  const error = usePacienteStore((s) => s.error);
  const cargar = usePacienteStore((s) => s.cargar);
  const crear = usePacienteStore((s) => s.crear);
  const actualizar = usePacienteStore((s) => s.actualizar);
  const eliminar = usePacienteStore((s) => s.eliminar);
  useEffect(() => {
    cargar();
  }, []);

  return { pacientes, cargando, error, cargar, crear, actualizar, eliminar };
}
