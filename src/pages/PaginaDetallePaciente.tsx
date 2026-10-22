import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, Phone, Stethoscope, Calendar, ArrowLeft } from "lucide-react";
import { BadgeEstado } from "../components/badgeEstado";
import { Paginanoencontrada } from "./Pagenoencontrado";
import { usePacienteStore } from "../stores/pacientesstore";

export const DetallePaciente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pacientes = usePacienteStore((s) => s.paciente);
  const cargando = usePacienteStore((s) => s.cargando);
  const cargar = usePacienteStore((s) => s.cargar);

  const [inicializando, setInicializando] = useState(pacientes.length === 0);

  useEffect(() => {
    if (pacientes.length === 0) {
      cargar().finally(() => setInicializando(false));
    }
  }, []);

  if (inicializando || (cargando && pacientes.length === 0)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Cargando...</p>
      </div>
    );
  }

  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return <Paginanoencontrada />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={16} />
        Volver
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-600">
              {paciente.nombre.charAt(0)}
              {paciente.apellido.charAt(0)}
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {paciente.nombre} {paciente.apellido}
              </h1>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                <Stethoscope size={14} className="text-slate-400" />
                {paciente.especialidadAsignada}
              </p>
            </div>
          </div>

          <BadgeEstado estado={paciente.estado} />
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-700">
              <Mail size={14} className="text-slate-400" />
              {paciente.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Teléfono
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-700">
              <Phone size={14} className="text-slate-400" />
              {paciente.telefono}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Especialidad asignada
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-700">
              <Stethoscope size={14} className="text-slate-400" />
              {paciente.especialidadAsignada}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Última cita
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-700">
              <Calendar size={14} className="text-slate-400" />
              {paciente.ultimaCita}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estado actual
          </p>
          <div className="mt-2">
            <BadgeEstado estado={paciente.estado} />
          </div>
        </div>
      </div>
    </div>
  );
};
