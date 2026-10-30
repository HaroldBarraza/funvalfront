import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EstadoVacioProps {
  titulo: string;
  descripcion?: string;
  icono?: ReactNode;
  accion?: { label: string; onClick: () => void };
} 

export function EstadoVacio({ titulo, descripcion, icono, accion }: EstadoVacioProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        {icono ?? <Inbox size={26} />}
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">{titulo}</h3>

      {descripcion && (
        <p className="mt-1 max-w-sm text-sm text-slate-500">{descripcion}</p>
      )}

      {accion && (
        <button
          type="button"
          onClick={accion.onClick}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {accion.label}
        </button>
      )}
    </div>
  );
}