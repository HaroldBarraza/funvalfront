import { useState } from "react";
import { Users } from "lucide-react";
import type { EstadoPaciente, Paciente } from "../types/paciente";
import { SearchBar } from "../components/serarchbar";
import { PacientesCards } from "../components/PacientesCards";
import { FormularioPaciente } from "../components/formularioPaciente";
import { Pacientesdata } from "../data/pacientes";

type EstadoFiltro = EstadoPaciente | "Todos";

export default function PaginaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(Pacientesdata);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>("Todos");

  // Filtros combinados: se recalculan en cada render, nunca mutan `pacientes`
  const termino = busqueda.trim().toLowerCase();
  const pacientesFiltrados = pacientes.filter((p) => {
    const coincideBusqueda =
      !termino ||
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(termino) ||
      p.email.toLowerCase().includes(termino);

    const coincideEstado =
      estadoFiltro === "Todos" || p.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  // Agregar — copia nueva del array
  const handleAgregar = (nuevo: Omit<Paciente, "id">) => {
    const paciente: Paciente = { ...nuevo, id: crypto.randomUUID() };
    setPacientes((prev) => [...prev, paciente]);
  };

  // Cambiar estado — map + spread (inmutable)
  const handleCambiarEstado = (id: string, estado: EstadoPaciente) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado } : p)),
    );
  };

  // Eliminar — filter + confirmación
  const handleEliminar = (id: string) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (!paciente) return;

    const ok = window.confirm(
      `¿Eliminar a ${paciente.nombre} ${paciente.apellido}?`,
    );
    if (!ok) return;

    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
  };

  const hayFiltrosActivos = busqueda.trim() !== "" || estadoFiltro !== "Todos";

  return (
    <div className="min-h-screen bg-black-50">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Users size={22} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-green-800 md:text-2xl">
              Pacientes
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Lista de pacientes registrados en el sistema.
            </p>
          </div>
        </div>

        <FormularioPaciente onAgregar={handleAgregar} />

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchBar value={busqueda} onchange={setBusqueda} />
          </div>

          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value as EstadoFiltro)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="Todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En espera</option>
          </select>

          <button
            type="button"
            onClick={limpiarFiltros}
            disabled={!hayFiltrosActivos}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Limpiar filtros
          </button>
        </div>

        <p className="mb-3 text-xs font-medium text-slate-400">
          {pacientesFiltrados.length} paciente
          {pacientesFiltrados.length !== 1 ? "s" : ""} encontrado
          {pacientesFiltrados.length !== 1 ? "s" : ""}
        </p>

        {pacientesFiltrados.length > 0 ? (
          <div className="flex flex-col gap-3">
            {pacientesFiltrados.map((paciente) => (
              <PacientesCards
                key={paciente.id}
                paciente={paciente}
                onCambiarEstado={handleCambiarEstado}
                onEliminar={handleEliminar}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-500">
              No se encontraron pacientes que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
