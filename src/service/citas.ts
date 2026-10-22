import { api } from "../libs/axios";

export interface Pacientes {
  name_paciente: string;
  appaterno_paciente: string;
  apmaterno_paciente: string;
  genero: "MASCULINO" | "FEMENINO";
  fecha_nacimiento: string;
}

export interface MedicosAni {
  name_empleado: string;
  appaterno: string;
  especialidades: {
    id_especialidad: number;
    name_especialidad: string;
    descripcion_especialidad: string;
  };
}

export interface CreadorAni {
  name_empleado: string;
  appaterno: string;
  role: string;
}

export interface EstadoAni {
  name_estado: string;
}

export interface CitasApi {
  id_cita: number;
  id_paciente: number;
  descripcion: string;
  id_medico: number;
  id_estado: number;
  fecha_creacion: string;
  fecha_de_cita: string;
  hora_de_cita: string;
  creado_por: number;
  pacientes: Pacientes;
  estado: EstadoAni;
  medico: MedicosAni;
  users: CreadorAni;
}

export type CrearCitasDto = {
  id_paciente: number;
  id_medico: number;
  fecha_de_cita: string;
  hora_de_cita: string;
  descripcion: string;
};

export const getAll = () =>
  api.get<{ datos: CitasApi[] }>("/citas");

export const createCitas = (data: CrearCitasDto) =>
  api.post<{ data: CitasApi }>("/citas", data);

export const updateEstado = (id: number, estado: number) =>
  api.put<{ data: CitasApi }>(`/citas/${id}`, { estado });

export const EstadoCita = [
  { value: 1, label: "Programada" },
  { value: 2, label: "Completada" },
  { value: 3, label: "Cancelada" },
] as const;

export const labelEstado = (id: number): string =>
  EstadoCita.find((e) => e.value === id)?.label ?? "Desconocido";

export const nombrePaciente = (c: CitasApi): string =>
  `${c.pacientes.name_paciente} ${c.pacientes.appaterno_paciente} ${c.pacientes.apmaterno_paciente}`.trim();

export const nombreMedico = (c: CitasApi): string =>
  `${c.medico.name_empleado} ${c.medico.appaterno}`.trim();