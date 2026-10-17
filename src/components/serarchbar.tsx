import { Search } from "lucide-react";

interface Buscador {
  value: string;
  onchange: (values: string) => void;
}

export const SearchBar = ({ value, onchange }: Buscador) => {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onchange(e.target.value)}
        placeholder="Buscar paciente por nombre o correo..."
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

interface StatusBadgeProps {
  activo: boolean;
}

export const StatusBadge = ({ activo }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        activo
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          activo ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {activo ? "Sistema Operativo" : "Modo Mantenimiento"}
    </span>
  );
};