import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../libs/axios";
import { getAll, createCitas, updateEstado } from "../service/citas";
import type { CitasApi, CrearCitasDto } from "../service/citas";
import { extraerMensajeError } from "../libs/errorHandler";

interface CitasState {
  citas: CitasApi[];
  citasSeleccionada: CitasApi | null;
  cargando: boolean;
  error: string | null;
  cargarTodas: () => Promise<void>;
  cargarPorPaciente: (id: number) => Promise<void>;
  seleccionar: (id: number) => void;
  actualizarEstado: (id: number, estado: number) => Promise<void>;
  agregarCita: (data: CrearCitasDto) => Promise<CitasApi>;
}
export const useCitasStado = create<CitasState>()(
  devtools(
    (set, get) => ({
      citas: [],
      citasSeleccionada: null,
      cargando: false,
      error: null,
      cargarTodas: async () => {
        set({ cargando: true, error: null });
        try {
          const res = await getAll();
          set({ citas: res.data.datos, cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
        }
      },
      cargarPorPaciente: async (id) => {
        set({ cargando: true, error: null });
        try {
          const res = await api.get<{
            data: { citas: CitasApi[] };
          }>(`/pacientes/${id}/citas`);
          set({ citas: res.data.data.citas ?? [], cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
        }
      },
      seleccionar: (id) => {
        const cita = get().citas.find((c) => c.id_cita === id) ?? null;
        set({ citasSeleccionada: cita });
      },
      actualizarEstado: async (id, nuevoEstado) => {
        const anterior = get().citas;
        set({
          citas: anterior.map((c) =>
            c.id_cita === id ? { ...c, id_estado: nuevoEstado } : c,
          ),
        });
        try {
          await updateEstado(id, nuevoEstado);
        } catch (err) {
          set({ citas: anterior });
          throw err;
        }
      },
      agregarCita: async (data) => {
        const res = await createCitas(data);
        const nueva = res.data.data;
        set({ citas: [nueva, ...get().citas] });
        return nueva;
      },
    }),
    { name: "CitasStore" },
  ),
);
