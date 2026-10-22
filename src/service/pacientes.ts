import { api } from "../libs/axios";

import type { RespuestaPaginada } from "../types/api";

export const getPacientesPaginado = async (
  pagina: number = 1,
  pageSize: number = 10,
): Promise<RespuestaPaginada<PacienteAPI>> => {
  const res = await getAll();
  const todos = res.data.datos;
  const inicio = (pagina - 1) * pageSize;
  const fin = inicio + pageSize;
  return {
    data: todos.slice(inicio, fin),
    total: todos.length,
    pagina,
    totalPaginas: Math.max(1, Math.ceil(todos.length / pageSize)),
  };
};

export type Genero = "MASCULINO" | "FEMENINO";

export interface PacienteAPI {
  id_paciente: number;
  name_paciente: string;
  appaterno_paciente: string;
  apmaterno_paciente: string;
  telefono: string;
  email: string;
  fecha_nacimiento: string;
  genero: Genero;
  fecha_registro: string;
}

export type CrearPacienteDTO = Omit<
  PacienteAPI,
  "id_paciente" | "fecha_registro"
>;

export type ActualizarPacienteDTO = Partial<CrearPacienteDTO>;

export const getAll = () => api.get<{ datos: PacienteAPI[] }>("/pacientes");

export const creatpaciente = (data: CrearPacienteDTO) =>
  api.post<{ data: PacienteAPI }>("/pacientes", data);

export const update = (id: number, data: ActualizarPacienteDTO) =>
  api.put<{ data: PacienteAPI }>(`/pacientes/${id}`, data);

export const remove = (id: number) =>
  api.delete<{ message: string }>(`/pacientes/${id}`);
