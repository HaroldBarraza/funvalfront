import { useEffect, useState } from "react";
import { Users, X } from "lucide-react";
import toast from "react-hot-toast";
import { SearchBar } from "../components/serarchbar";
import { PacientesCards } from "../components/PacientesCards";
import { FormularioPaciente } from "../components/formularioPaciente";
import { ModalConfirmacion } from "../components/ModalConfirmacion";
import { usePacienteStore } from "../stores/pacientesstore";
import { useFiltrosStore } from "../stores/filtrostore";
import { useDebounce } from "../hooks/useDebaunce";
import { extraerMensajeError } from "../service/errorHandler";
import type { Paciente } from "../types/paciente";

export default function PaginaPacientes() {
  const pacientes = usePacienteStore((s) => s.paciente);
  const cargando = usePacienteStore((s) => s.cargando);
  const error = usePacienteStore((s) => s.error);
  const cargar = usePacienteStore((s) => s.cargar);
  const eliminar = usePacienteStore((s) => s.eliminar);

  const queryPacientes = useFiltrosStore((s) => s.queryPacientes);
  const setQueryPacientes = useFiltrosStore((s) => s.setQueryPacientes);
  const resetFiltros = useFiltrosStore((s) => s.resetFiltros);

  // El query debounced es el que realmente filtra
  const queryDebounced = useDebounce(queryPacientes, 3000);

  // true si hay un debounce pendiente (el usuario está escribiendo)
  const buscando = queryPacientes !== queryDebounced;

  const [pacienteAEliminar, setPacienteAEliminar] = useState<Paciente | null>(
    null,
  );
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  const termino = queryDebounced.trim().toLowerCase();
  const pacientesFiltrados = termino
    ? pacientes.filter(
        (p) =>
          `${p.nombre} ${p.apellido}`.toLowerCase().includes(termino) ||
          p.email.toLowerCase().includes(termino),
      )
    : pacientes;

  const abrirModalEliminar = (id: string) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) setPacienteAEliminar(paciente);
  };

  const confirmarEliminar = async () => {
    if (!pacienteAEliminar) return;
    setEliminando(true);
    try {
      await eliminar(Number(pacienteAEliminar.id));
      toast.success("Paciente eliminado");
      setPacienteAEliminar(null);
    } catch (err) {
      toast.error(extraerMensajeError(err));
    } finally {
      setEliminando(false);
    }
  };

  const hayFiltrosActivos = queryPacientes !== "";

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="text-sm text-slate-500">Cargando pacientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-4xl">⚠️</p>
        <h1 className="text-lg font-semibold text-slate-900">
          No se pudieron cargar los pacientes
        </h1>
        <p className="max-w-md text-sm text-slate-500">{error}</p>
        <button
          type="button"
          onClick={() => cargar()}
          className="mt-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <Users size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pacientes</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Lista de pacientes registrados en el sistema.
          </p>
        </div>
      </header>

      <FormularioPaciente />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar
            value={queryPacientes}
            onchange={setQueryPacientes}
            cargando={buscando}
          />
        </div>

        <button
          type="button"
          onClick={resetFiltros}
          disabled={!hayFiltrosActivos}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={14} />
          Limpiar filtros
        </button>
      </div>

      <p className="mb-3 text-xs font-medium text-slate-500">
        {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""}{" "}
        registrado{pacientes.length !== 1 ? "s" : ""}
        {termino && (
          <>
            {" · "}
            {pacientesFiltrados.length} mostrado
            {pacientesFiltrados.length !== 1 ? "s" : ""}
          </>
        )}
      </p>

      {pacientesFiltrados.length > 0 ? (
        <div className="flex flex-col gap-3">
          {pacientesFiltrados.map((paciente) => (
            <PacientesCards
              key={paciente.id}
              paciente={paciente}
              onEliminar={abrirModalEliminar}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <p className="text-sm text-slate-500">
            No se encontraron pacientes que coincidan con la búsqueda.
          </p>
        </div>
      )}

      <ModalConfirmacion
        abierto={pacienteAEliminar !== null}
        titulo="Eliminar paciente"
        mensaje={
          pacienteAEliminar
            ? `¿Estás seguro de eliminar a ${pacienteAEliminar.nombre} ${pacienteAEliminar.apellido}? Esta acción no se puede deshacer.`
            : ""
        }
        textoConfirmar="Eliminar"
        cargando={eliminando}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPacienteAEliminar(null)}
      />
    </div>
  );
}