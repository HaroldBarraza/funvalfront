import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Phone, Stethoscope, Calendar, ArrowLeft } from "lucide-react";
import { BadgeEstado } from "../components/badgeEstado";
import { api } from "../libs/axios";
import { Paginanoencontrada } from "./Pagenoencontrado";
import type { Paciente } from "../types/paciente";

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

export const DetallePaciente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/pacientes")
      .then((res) => {
        const lista: Paciente[] = res.data.datos.map(mapearPaciente);
        const encontrado = lista.find((p) => p.id === id) ?? null;
        setPaciente(encontrado);
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-slate-500">No se pudo cargar el paciente.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Volver
        </button>
      </div>
    );
  }

  if (!paciente) {
    return <Paginanoencontrada />;
  }
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#3b82f6]"
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
              <h1 className="text-xl font-bold text-[#101828]">
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
