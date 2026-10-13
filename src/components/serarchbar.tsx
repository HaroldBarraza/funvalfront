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
        className="w-full rounded-lg border border-slate-200 bg-black py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};
