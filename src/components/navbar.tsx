import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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

      <nav className="flex flex-col gap-1 p-4">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/pacientes" className={linkClass}>
          Pacientes
        </NavLink>
        <NavLink to="/citas" className={linkClass}>
          Citas
        </NavLink>
        <NavLink to="/citas/nueva" className={linkClass}>
          Nueva cita
        </NavLink>
        <NavLink to="/reportes" className={linkClass}>
          Reportes
        </NavLink>
      </nav>
    </aside>
  );
};
