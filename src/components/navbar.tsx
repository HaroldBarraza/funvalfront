import { NavLink } from "react-router-dom";
import { Users, CalendarDays, BarChart3 } from "lucide-react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const subLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
  }`;

export const Nav = () => {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xl text-white">
          🏥
        </span>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Clínica<span className="text-blue-600">.</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <NavLink to="/" end className={linkClass}>
          <span className="text-base">📊</span>
          Dashboard
        </NavLink>

        <NavLink to="/pacientes" className={linkClass}>
          <Users size={18} />
          Pacientes
        </NavLink>

        {/* Sección "Citas" con sub-items indentados */}
        <div className="mt-1">
          <div className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700">
            <CalendarDays size={18} className="text-slate-400" />
            Citas
          </div>
          <div className="ml-[1.4rem] flex flex-col gap-0.5 border-l-2 border-slate-200 pl-2">
            <NavLink to="/citas" end className={subLinkClass}>
              Todas
            </NavLink>
            <NavLink to="/citas/historial" className={subLinkClass}>
              Historial
            </NavLink>
            <NavLink to="/citas/nueva" className={subLinkClass}>
              Nueva cita
            </NavLink>
          </div>
        </div>

        <NavLink to="/reportes" className={`${linkClass} mt-1`}>
          <BarChart3 size={18} />
          Reportes
        </NavLink>
      </nav>
    </aside>
  );
};