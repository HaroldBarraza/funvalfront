import { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Nav } from "../components/navbar";
import { useAuthStore } from "../stores/authStore";
import { perfilService } from "../service/perfile";

export const Layout = () => {
  const navigate = useNavigate();
  const usuarioNombre = useAuthStore((s) => s.usuarioNombre);
  const usuarioAvatar = useAuthStore((s) => s.usuarioAvatar);
  const usuarioRol = useAuthStore((s) => s.usuarioRol);
  const autenticado = useAuthStore((s) => s.autenticado);
  const logout = useAuthStore((s) => s.logout);
  const actualizarPerfil = useAuthStore((s) => s.actualizarPerfil);

  // Carga el avatar desde /auth/me al montar
  useEffect(() => {
    if (!autenticado) return;
    perfilService
      .obtener()
      .then((p) => actualizarPerfil(p.nombre, p.fotoPerfil ?? null, p.email, p.telefono))
      .catch(() => {});
  }, [autenticado, actualizarPerfil]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Nav />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <Link
              to="/perfil"
              className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-100"
            >
              {usuarioAvatar ? (
                <img
                  src={usuarioAvatar}
                  alt={usuarioNombre ?? "Perfil"}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={16} />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {usuarioNombre ?? "Usuario"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {usuarioRol ?? "Sin rol"}
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
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