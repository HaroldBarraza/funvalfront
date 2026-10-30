import type { ReactNode } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

export type TipoAlerta = "info" | "exito" | "advertencia" | "error";

interface AlertaBannerProps {
  tipo: TipoAlerta;
  mensaje: string;
  descripcion?: string;
  accion?: { label: string; onClick: () => void };
  onClose?: () => void;
  icono?: ReactNode;
}

const config: Record<
  TipoAlerta,
  { bg: string; border: string; text: string; iconColor: string; Icon: typeof Info }
> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    iconColor: "text-blue-600",
    Icon: Info,
  },
  exito: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    iconColor: "text-emerald-600",
    Icon: CheckCircle2,
  },
  advertencia: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    iconColor: "text-amber-600",
    Icon: AlertTriangle,
  },
  error: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-800",
    iconColor: "text-rose-600",
    Icon: XCircle,
  },
};

export function AlertaBanner({
  tipo,
  mensaje,
  descripcion,
  accion,
  onClose,
  icono,
}: AlertaBannerProps) {
  const { bg, border, text, iconColor, Icon } = config[tipo];

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${bg} ${border} ${text}`}
      role="alert"
    >
      <span className={`shrink-0 ${iconColor}`}>
        {icono ?? <Icon size={20} />}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{mensaje}</p>
        {descripcion && <p className="mt-0.5 text-xs opacity-80">{descripcion}</p>}
        {accion && (
          <button
            type="button"
            onClick={accion.onClick}
            className="mt-2 text-xs font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {accion.label}
          </button>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-0.5 opacity-60 transition hover:bg-black/5 hover:opacity-100"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}