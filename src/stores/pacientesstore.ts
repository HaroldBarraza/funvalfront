import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAll, creatpaciente, update, remove } from "../service/pacientes";
import type {
  PacienteAPI,
  CrearPacienteDTO,
  ActualizarPacienteDTO,
} from "../service/pacientes";
import { extraerMensajeError } from "../libs/errorHandler";
import type { Paciente } from "../types/paciente";

const mapearPaciente = (p: PacienteAPI): Paciente => ({
  id: String(p.id_paciente),
  nombre: p.name_paciente,
  apellido: `${p.appaterno_paciente} ${p.apmaterno_paciente}`.trim(),
  email: p.email,
  telefono: p.telefono,
  especialidadAsignada: "Sin asignar",
  ultimaCita: "-",
  estado: "activo",
});
interface PacintesState {
  paciente: Paciente[];
  cargando: boolean;
  error: string | null;
  cargar: (query?: string) => Promise<void>;
  crear: (data: CrearPacienteDTO) => Promise<Paciente>;
  actualizar: (id: number, data: ActualizarPacienteDTO) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
}
export const usePacienteStore = create<PacintesState>()(
  devtools(
    (set, get) => ({
      paciente: [],
      cargando: false,
      error: null,
      cargar: async (query) => {
        set({ cargando: true, error: null });
        try {
          const res = await getAll();
          let lista = res.data.datos.map(mapearPaciente);
          if (query) {
            const termino = query.trim().toLowerCase();
            lista = lista.filter(
              (p) =>
                `${p.nombre} ${p.apellido}`.toLowerCase().includes(termino) ||
                p.email.toLowerCase().includes(termino),
            );
          }
          set({ paciente: lista, cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
        }
      },
      crear: async (data) => {
        const res = await creatpaciente(data);
        const nuevo = mapearPaciente(res.data.data);
        set({ paciente: [...get().paciente, nuevo] });
        return nuevo;
      },
      actualizar: async (id, data) => {
        const res = await update(id, data);
        const actulizado = mapearPaciente(res.data.data);
        set({
          paciente: get().paciente.map((p) =>
            p.id === String(id) ? actulizado : p,
          ),
        });
      },
      eliminar: async (id) => {
        await remove(id);
        set({
          paciente: get().paciente.filter((p) => p.id !== String(id)),
        });
      },
    }),
    { name: "PacienteStore" },
  ),
);
