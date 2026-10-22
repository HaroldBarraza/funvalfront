import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FiltroState {
  queryPacientes: string;
  especialidadFiltro: string;
  estadoCitaFiltro: number | "Todos";
  setQueryPacientes: (q: string) => void;
  setEspecialidad: (e: string) => void;
  setEstadoCita: (e: number | "Todos") => void;
  resetFiltros: () => void;
}

const ESTADO_INICIAL = {
  queryPacientes: "",
  especialidadFiltro: "Todas",
  estadoCitaFiltro: "Todos" as const,
};

export const useFiltrosStore = create<FiltroState>()(
  devtools(
    (set) => ({
      ...ESTADO_INICIAL,
      setQueryPacientes: (q) => set({ queryPacientes: q }),
      setEspecialidad: (e) => set({ especialidadFiltro: e }),
      setEstadoCita: (e) => set({ estadoCitaFiltro: e }),
      resetFiltros: () => set(ESTADO_INICIAL),
    }),
    { name: "FiltrosStore" },
  ),
);
