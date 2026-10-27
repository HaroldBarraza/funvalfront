import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSchema } from "../schemas/loginSchema";
import type { LoginFormData } from "../schemas/loginSchema";
import { login } from "../service/auth";
import { useAuthStore } from "../stores/authStore";
import { extraerMensajeError } from "../libs/errorHandler";

function ClinicMark() {
  return (
    <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
      🏥
    </span>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (datos: LoginFormData) => {
    try {
      const { token, usuario } = await login(datos);
      setAuth(token, usuario);
      toast.success(`¡Bienvenido, ${usuario.nombre}!`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(extraerMensajeError(err));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between bg-blue-700 p-10 text-white lg:flex xl:p-14">
            <div className="flex items-center gap-3">
              <ClinicMark />
              <span className="text-xl font-bold tracking-tight">Clínica</span>
            </div>
            <div className="max-w-md">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Sistema interno
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Gestiona tu clínica con confianza.
              </h1>
              <p className="mt-6 max-w-sm text-base leading-7 text-blue-100">
                Administra pacientes, citas y reportes desde un solo lugar.
                Acceso exclusivo para personal autorizado.
              </p>
            </div>
            <p className="text-sm text-blue-200">© 2026 Clínica</p>
          </div>

          <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
            <div className="w-full max-w-sm">
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <ClinicMark />
                <span className="text-xl font-bold tracking-tight">
                  Clínica
                </span>
              </div>
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-blue-700">
                  Bienvenido de vuelta
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  Inicia sesión
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Accede al sistema de gestión de la clínica.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <label className="block text-sm font-semibold text-slate-700">
                  Correo electrónico
                  <input
                    {...register("email")}
                    className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="mt-1 block text-xs font-medium text-rose-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Contraseña
                  <input
                    {...register("password")}
                    className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <span className="mt-1 block text-xs font-medium text-rose-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>

                <button
                  className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-slate-400">
                © 2026 Clínica. Sistema interno.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
