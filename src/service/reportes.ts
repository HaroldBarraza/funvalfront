import { api } from "../libs/axios";

export interface Reportes {
  especialidad: string;
  total: number;
}

export const getEspecialidad = (fechInicio: string, fechaFinal: string) =>
  api.get<{ data: Reportes[] }>("/citas/reporte", {
    params: { fecha_inicio: fechInicio, fecha_final: fechaFinal },
  });
