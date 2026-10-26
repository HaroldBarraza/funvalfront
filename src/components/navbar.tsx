import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export const Nav = () => {
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);

  const handlerLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
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
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 rounded-lg bg-slate-50 p-3">
          <p className="truncate text-sm font-semibold text-slate-900">
            {usuario?.nombre ?? "Usuario"}
          </p>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {usuario?.rol ?? "Sin rol"}
          </p>
        </div>
        <button
          type="button"
          onClick={handlerLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
