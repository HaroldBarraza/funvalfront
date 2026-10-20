import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import type { EstadoPaciente, Paciente } from "../types/paciente";
import { SearchBar } from "../components/serarchbar";
import { PacientesCards } from "../components/PacientesCards";
import { FormularioPaciente } from "../components/formularioPaciente";
import { api } from "../libs/axios";

type EstadoFiltro = EstadoPaciente | "Todos";

interface PacienteAPI {
  id_paciente: number;
  name_paciente: string;
  appaterno_paciente: string;
  apmaterno_paciente: string;
  telefono: string;
  email: string;
  fecha_nacimiento: string;
  genero: string;
  fecha_registro: string;
}


const mapearPaciente = (p: PacienteAPI): Paciente => ({
  id: String(p.id_paciente),
  nombre: p.name_paciente,
  apellido: `${p.appaterno_paciente} ${p.apmaterno_paciente}`.trim(),
  email: p.email,
  telefono: p.telefono,
  especialidadAsignada: "Sin asignar",
  ultimaCita: "—",
  estado: "activo",
});

export default function PaginaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>("Todos");

  const cargarPacientes = () => {
    api
      .get("/pacientes")
      .then((res) => {
        const mapeados: Paciente[] = res.data.datos.map(mapearPaciente);
        setPacientes(mapeados);
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const reintentar = () => {
    setCargando(true);
    setError(false);
    cargarPacientes();
  };

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

  const handleAgregar = (nuevo: Omit<Paciente, "id">) => {
    const paciente: Paciente = { ...nuevo, id: crypto.randomUUID() };
    setPacientes((prev) => [...prev, paciente]);
  };

  const handleCambiarEstado = (id: string, estado: EstadoPaciente) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado } : p)),
    );
  };

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
        <p className="max-w-md text-sm text-slate-500">
          Verifica que el servidor esté corriendo y que tu sesión siga activa.
        </p>
        <button
          type="button"
          onClick={reintentar}
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

      <FormularioPaciente onAgregar={handleAgregar} />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={busqueda} onchange={setBusqueda} />
        </div>

        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value as EstadoFiltro)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Limpiar filtros
        </button>
      </div>

      <p className="mb-3 text-xs font-medium text-slate-500">
        {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""}{" "}
        registrado{pacientes.length !== 1 ? "s" : ""}
        {hayFiltrosActivos && (
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
              onCambiarEstado={handleCambiarEstado}
              onEliminar={handleEliminar}
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
    </div>
  );
}