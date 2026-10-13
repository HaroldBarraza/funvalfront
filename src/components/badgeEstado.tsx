import type {EstadoPaciente } from "../types/paciente";


interface BadgeEstadoPaciente {
    estado: EstadoPaciente;
}

const colorPorEstados: Record<EstadoPaciente, { label: string; classes: string; dotClasses: string }> = {
    activo: {
        label: "Activo",
        classes: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        dotClasses: "bg-emerald-500",
    },
    inactivo: {
        label: "Inactivo",
        classes: "bg-slate-100 text-slate-600 border border-slate-200",
        dotClasses: "bg-slate-400",
    },
    en_espera: {
        label: "En espera",
        classes: "bg-amber-50 text-amber-700 border border-amber-200",
        dotClasses: "bg-amber-500",
    },
};

export const BadgeEstado = ({ estado }: BadgeEstadoPaciente) => {
    const config = colorPorEstados[estado];

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.classes}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${config.dotClasses}`} />
            {config.label}
        </span>
    );
};