import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import toast from "react-hot-toast";
import { SearchBar } from "../components/serarchbar";
import { PacientesCards } from "../components/PacientesCards";
import { FormularioPaciente } from "../components/formularioPaciente";
import { ModalConfirmacion } from "../components/ModalConfirmacion";
import { getAll, remove } from "../service/pacientes";
import type { PacienteAPI } from "../service/pacientes";
import { extraerMensajeError } from "../service/errorHandler";
import type { Paciente } from "../types/paciente";

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

  const [pacienteAEliminar, setPacienteAEliminar] = useState<Paciente | null>(
    null,
  );
  const [eliminando, setEliminando] = useState(false);

  const cargarPacientes = () => {
    getAll()
      .then((res) => setPacientes(res.data.datos.map(mapearPaciente)))
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
    if (!termino) return true;
    return (
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(termino) ||
      p.email.toLowerCase().includes(termino)
    );
  });

  const handleCreado = (p: PacienteAPI) => {
    setPacientes((prev) => [...prev, mapearPaciente(p)]);
  };

  const abrirModalEliminar = (id: string) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) setPacienteAEliminar(paciente);
  };

  const confirmarEliminar = async () => {
    if (!pacienteAEliminar) return;
    setEliminando(true);
    try {
      await remove(Number(pacienteAEliminar.id));
      setPacientes((prev) =>
        prev.filter((p) => p.id !== pacienteAEliminar.id),
      );
      toast.success("Paciente eliminado");
      setPacienteAEliminar(null);
    } catch (err) {
      toast.error(extraerMensajeError(err));
    } finally {
      setEliminando(false);
    }
  };

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

      <FormularioPaciente onCreado={handleCreado} />

      <div className="mb-5">
        <SearchBar value={busqueda} onchange={setBusqueda} />
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