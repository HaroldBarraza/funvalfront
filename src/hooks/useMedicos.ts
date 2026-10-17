import { useEffect, useState } from "react";
import type { Medico } from "../types/Medicos";

const medicosdata: Medico[] = [
  { id: "1", nombre: "Dra. María González", especialidad: "Cardiología" },
  { id: "2", nombre: "Dr. Carlos Rodríguez", especialidad: "Dermatología" },
  { id: "3", nombre: "Dra. Ana Martínez", especialidad: "Neurología" },
  { id: "4", nombre: "Dr. Javier López", especialidad: "Traumatología" },
  { id: "5", nombre: "Dra. Lucía Fernández", especialidad: "Pediatría" },
];
interface UseMedicoData {
  medicos: Medico[];
  cargando: boolean;
}
export const useMedico = (): UseMedicoData => {
  const [medicos, setmedico] = useState<Medico[]>([]);
  const [cargando, setcargando] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setmedico(medicosdata),
        setcargando(false)
    },800)
    return() => clearTimeout(timer)
  },[])
  return {medicos, cargando}
};
