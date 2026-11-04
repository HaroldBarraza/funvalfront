import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CalendarDays,
  Activity,
  Stethoscope,
  RefreshCw,
  Percent,
} from "lucide-react";

import { api } from "../libs/axios";
import { StatusBadge } from "../components/serarchbar";
import { usePacientes } from "../features/pacientes/hooks/usePacientes";
import { useCitas } from "../features/pacientes/hooks/useCitas";
import { useApi } from "../hooks/useApi";
import { SkeletonMetricCard } from "../shared/components/skeletons/SkeletonMetricCard";

interface MedicoAPI {
  id_empleado: number;
  name_empleado: string;
  appaterno: string;
}

interface StatCardProps {
  label: string;
  value: number | string | null;
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

  const {
    pacientes,
    cargando: cargandoPacientes,
    cargar: cargarPacientes,
  } = usePacientes();
  const { citas, cargando: cargandoCitas, recarga: recargarCitas } = useCitas();

  const { data: medicosRespuesta, cargando: cargandoMedicos } = useApi<
    MedicoAPI[]
  >(() =>
    api.get<{ datos: MedicoAPI[] }>("/users/medicos").then((r) => r.data.datos),
  );

  const metricas = useMemo(() => {
    const totalPacientes = pacientes.length;
    const totalMedicos = medicosRespuesta ? medicosRespuesta.length : null;
    const citasProgramadas = citas.filter((c) => c.id_estado === 1).length;
    const citasCompletadas = citas.filter((c) => c.id_estado === 2).length;
    const totalCitas = citas.length;

    const porcentajeCompletadas =
      totalCitas > 0 ? Math.round((citasCompletadas / totalCitas) * 100) : 0;

    return {
      totalPacientes,
      totalMedicos,
      citasProgramadas,
      citasCompletadas,
      porcentajeCompletadas,
    };
  }, [pacientes, citas, medicosRespuesta]);

  const cargandoTodo = cargandoPacientes || cargandoCitas || cargandoMedicos;

  const handleRefrescar = () => {
    cargarPacientes();
    recargarCitas();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefrescar}
            disabled={cargandoTodo}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={cargandoTodo ? "animate-spin" : ""}
            />
            Actualizar datos
          </button>
          <StatusBadge activo={!mantenimiento} />
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cargandoTodo ? (
          Array.from({ length: 5 }).map((_, i) => (
            <SkeletonMetricCard key={i} />
          ))
        ) : (
          <>
            <StatCard
              label="Pacientes"
              value={metricas.totalPacientes}
              icon={Users}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Médicos"
              value={metricas.totalMedicos}
              icon={Stethoscope}
              color="bg-violet-50 text-violet-600"
            />
            <StatCard
              label="Programadas"
              value={metricas.citasProgramadas}
              icon={CalendarDays}
              color="bg-sky-50 text-sky-600"
            />
            <StatCard
              label="Completadas"
              value={metricas.citasCompletadas}
              icon={Activity}
              color="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              label="Tasa completadas"
              value={`${metricas.porcentajeCompletadas}%`}
              icon={Percent}
              color="bg-amber-50 text-amber-600"
            />
          </>
        )}
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
