import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Nav } from "../components/navbar";
import { useAuthStore } from "../stores/authStore";

export const Layout = () => {
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);

  const heandleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Nav />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {usuario?.nombre ?? "Usuario"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {usuario?.rol ?? "Sin rol"}
              </p>
            </div>

            <button
              type="button"
              onClick={heandleLogout}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
