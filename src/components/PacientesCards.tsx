import { Mail, Phone, Stethoscope, Calendar } from "lucide-react";
import type { Paciente } from "../types/paciente";
import { BadgeEstado } from "./badgeEstado";

interface PacienteCardProps {
  paciente: Paciente;
}

export const PacientesCards = ({ paciente }: PacienteCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md md:p-5">
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
              {paciente.nombre.charAt(0)}
              {paciente.apellido.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {paciente.nombre} {paciente.apellido}
              </p>
              <p className="truncate text-xs text-slate-500">
                {paciente.especialidadAsignada}
              </p>
            </div>
          </div>
          <BadgeEstado estado={paciente.estado} />
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
          <p className="flex items-center gap-2 truncate">
            <Mail size={14} className="shrink-0 text-slate-400" />
            <span className="truncate">{paciente.email}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} className="shrink-0 text-slate-400" />
            {paciente.telefono}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={14} className="shrink-0 text-slate-400" />
            Última cita: {paciente.ultimaCita}
          </p>
        </div>
      </div>

      <div className="md:flex md:items-center md:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
          {paciente.nombre.charAt(0)}
          {paciente.apellido.charAt(0)}
        </div>

        <div className="w-48 shrink-0">
          <p className="text-sm font-semibold text-slate-800">
            {paciente.nombre} {paciente.apellido}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Stethoscope size={12} className="text-slate-400" />
            {paciente.especialidadAsignada}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-1.5 text-sm text-slate-600">
            <Mail size={13} className="shrink-0 text-slate-400" />
            <span className="truncate">{paciente.email}</span>
          </p>
          <p className="flex items-center gap-1.5 text-sm text-slate-600">
            <Phone size={13} className="shrink-0 text-slate-400" />
            {paciente.telefono}
          </p>
        </div>

        <div className="w-32 shrink-0 text-right">
          <p className="text-xs text-slate-400">Última cita</p>
          <p className="text-sm text-slate-600">{paciente.ultimaCita}</p>
        </div>

        <div className="w-28 shrink-0 text-right">
          <BadgeEstado estado={paciente.estado} />
        </div>
      </div>
    </div>
  );
};
