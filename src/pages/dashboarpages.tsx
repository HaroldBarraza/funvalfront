import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, CalendarDays, Activity, Stethoscope } from "lucide-react";

import { api } from "../libs/axios";
import { StatusBadge } from "../components/serarchbar";

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

  const [pacientes, setPacientes] = useState<number | null>(null);
  const [medicos, setMedicos] = useState<number | null>(null);
  const [citasProgramadas, setCitasProgramadas] = useState<number | null>(null);
  const [citasCompletadas, setCitasCompletadas] = useState<number | null>(null);

  useEffect(() => {
    api.get("/pacientes").then((res) => {
      setPacientes(res.data.datos.length);
    });

    api.get("/users/medicos").then((res) => {
      setMedicos(res.data.datos.length);
    });

    api.get("/citas").then((res) => {
      const citas = res.data.datos;
      setCitasProgramadas(
        citas.filter((c: { id_estado: number }) => c.id_estado === 1).length,
      );
      setCitasCompletadas(
        citas.filter((c: { id_estado: number }) => c.id_estado === 2).length,
      );
    });
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
          value={pacientes}
          icon={Users}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Médicos"
          value={medicos}
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
