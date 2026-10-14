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
        className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100/20"
      />
    </div>
  );
};

interface StatusBadgeProps {
  activo: boolean;
}

export const StatusBadge = ({ activo }: StatusBadgeProps) => {
  return (
    <div>
      <p className={activo === true ? "text-green-600" : "text-red-600"}>
        {activo === true ? "Sistema Operativo" : "Modo Mantenimiento"}
      </p>
    </div>
  );
};
