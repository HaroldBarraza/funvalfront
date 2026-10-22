import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, CalendarDays, Activity, Stethoscope } from "lucide-react";

import { api } from "../libs/axios";
import { StatusBadge } from "../components/serarchbar";
import { usePacienteStore } from "../stores/pacientesstore";
import { useCitasStado } from "../stores/citasStoer";
import { useApi } from "../hooks/useApi";

interface MedicoAPI {
  id_empleado: number;
  name_empleado: string;
  appaterno: string;
}

interface StatCardProps {
  label: string;
  value: number | null;
  icon: typeof Users;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {value ?? "..."}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default function PaginaDashboard() {
  const [mantenimiento, setMantenimiento] = useState(false);

  // Pacientes desde el store
  const pacientes = usePacienteStore((s) => s.paciente) ?? [];
  const cargarPacientes = usePacienteStore((s) => s.cargar);

  // Citas desde el store
  const citas = useCitasStado((s) => s.citas) ?? [];
  const cargarCitas = useCitasStado((s) => s.cargarTodas);

  // Médicos con useApi (maneja cargando/error/cleanup internamente)
  const { data: medicosRespuesta } = useApi<MedicoAPI[]>(() =>
    api
      .get<{ datos: MedicoAPI[] }>("/users/medicos")
      .then((r) => r.data.datos),
  );

  // Derivados
  const totalPacientes = pacientes.length;
  const totalMedicos = medicosRespuesta ? medicosRespuesta.length : null;
  const citasProgramadas = citas.filter((c) => c.id_estado === 1).length;
  const citasCompletadas = citas.filter((c) => c.id_estado === 2).length;

  useEffect(() => {
    if (pacientes.length === 0) cargarPacientes();
    if (citas.length === 0) cargarCitas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {mantenimiento && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          El sistema está en mantenimiento
        </div>
      )}

      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Resumen general del sistema médico.
          </p>
        </div>
        <StatusBadge activo={!mantenimiento} />
      </header>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pacientes"
          value={totalPacientes}
          icon={Users}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Médicos"
          value={totalMedicos}
          icon={Stethoscope}
          color="bg-violet-50 text-violet-600"
        />
        <StatCard
          label="Citas programadas"
          value={citasProgramadas}
          icon={CalendarDays}
          color="bg-sky-50 text-sky-600"
        />
        <StatCard
          label="Completadas hoy"
          value={citasCompletadas}
          icon={Activity}
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-900">
            Acciones rápidas
          </h2>
          <div className="space-y-3">
            <Link
              to="/pacientes"
              className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Ver pacientes
                </p>
                <p className="text-xs text-slate-500">
                  Gestionar lista de pacientes
                </p>
              </div>
            </Link>
            <Link
              to="/citas/nueva"
              className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Crear nueva cita
                </p>
                <p className="text-xs text-slate-500">
                  Programar una cita médica
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-900">
            Estado del sistema
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Modo mantenimiento</span>
              <span
                className={`font-medium ${
                  mantenimiento ? "text-amber-600" : "text-slate-400"
                }`}
              >
                {mantenimiento ? "Activo" : "Inactivo"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMantenimiento((prev) => !prev)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {mantenimiento
                ? "Desactivar mantenimiento"
                : "Activar mantenimiento"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}