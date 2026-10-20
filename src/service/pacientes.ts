import { api } from "../libs/axios";

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

export const getAll = () =>
  api.get<{ datos: PacienteAPI[] }>("/pacientes");

export const create = (data: CrearPacienteDTO) =>
  api.post<{ data: PacienteAPI }>("/pacientes", data);

export const update = (id: number, data: ActualizarPacienteDTO) =>
  api.put<{ data: PacienteAPI }>(`/pacientes/${id}`, data);

export const remove = (id: number) =>
  api.delete<{ message: string }>(`/pacientes/${id}`);