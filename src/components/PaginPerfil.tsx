import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Pencil, Save } from "lucide-react";
import toast from "react-hot-toast";
import { perfilService, type UserProfile } from "../service/perfile";
import { useAuthStore } from "../stores/authStore";
import { InputFotoPerfil } from "./inputFotoPerfil";
import { extraerMensajeError } from "../libs/errorHandler";

const perfilSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  telefono: z
    .string()
    .regex(/^\d{8,15}$/, "Ingresa un teléfono válido (8 a 15 dígitos)")
    .optional()
    .or(z.literal("")),
});

type PerfilFormData = z.infer<typeof perfilSchema>;

export default function PaginaPerfil() {
  const usuarioAvatar = useAuthStore((s) => s.usuarioAvatar);
  const actualizarPerfil = useAuthStore((s) => s.actualizarPerfil);

  const [modo, setModo] = useState<"ver" | "editar">("ver");
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [cargando, setCargando] = useState(true);
  const [fotoArchivo, setFotoArchivo] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: { nombre: "", email: "", telefono: "" },
  });

  useEffect(() => {
    perfilService
      .obtener()
      .then((p) => {
        setPerfil(p);
        actualizarPerfil(p.nombre, p.fotoPerfil ?? null, p.email, p.telefono);
        reset({
          nombre: p.nombre,
          email: p.email,
          telefono: p.telefono ?? "",
        });
      })
      .catch(() => toast.error("No se pudo cargar el perfil"))
      .finally(() => setCargando(false));
  }, [actualizarPerfil, reset]);

  const entrarEdicion = () => {
    setModo("editar");
    setFotoArchivo(undefined);
    reset({
      nombre: perfil?.nombre ?? "",
      email: perfil?.email ?? "",
      telefono: perfil?.telefono ?? "",
    });
  };

  const cancelarEdicion = () => {
    setModo("ver");
    setFotoArchivo(undefined);
    if (perfil) {
      reset({
        nombre: perfil.nombre,
        email: perfil.email,
        telefono: perfil.telefono ?? "",
      });
    }
  };

  const onSubmit = async (datos: PerfilFormData) => {
    try {
      const actualizado = await perfilService.actualizar(datos, fotoArchivo);
      setPerfil(actualizado);
      actualizarPerfil(
        actualizado.nombre,
        actualizado.fotoPerfil ?? null,
        actualizado.email,
        actualizado.telefono,
      );
      setFotoArchivo(undefined);
      toast.success("Perfil actualizado");
      setModo("ver");
    } catch (err) {
      toast.error(extraerMensajeError(err));
    }
  };

  const iniciales = (perfil?.nombre ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const inputBase =
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <User size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {modo === "ver"
              ? "Consulta tu información personal."
              : "Actualiza tus datos personales y tu foto."}
          </p>
        </div>
      </header>

      {modo === "ver" ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-blue-50 text-3xl font-bold text-blue-600">
              {usuarioAvatar ? (
                <img
                  src={usuarioAvatar}
                  alt={perfil?.nombre ?? "Perfil"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{iniciales}</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {perfil?.nombre ?? "Sin nombre"}
            </h2>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {perfil?.rol ?? "—"}
            </span>
          </div>

          <dl className="mt-6 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Correo electrónico
              </dt>
              <dd className="mt-0.5 text-sm text-slate-900">
                {perfil?.email ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Teléfono
              </dt>
              <dd className="mt-0.5 text-sm text-slate-900">
                {perfil?.telefono || "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={entrarEdicion}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Pencil size={16} />
              Editar perfil
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <InputFotoPerfil
            fotoactual={usuarioAvatar}
            inicialies={iniciales}
            onChange={setFotoArchivo}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              {...register("nombre")}
              className={`${inputBase} ${
                errors.nombre ? "border-rose-400" : "border-slate-300"
              }`}
            />
            {errors.nombre && (
              <p className="text-xs font-medium text-rose-600">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
              className={`${inputBase} ${
                errors.email ? "border-rose-400" : "border-slate-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-medium text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Teléfono{" "}
              <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <input
              type="text"
              placeholder="987654321"
              {...register("telefono")}
              className={`${inputBase} ${
                errors.telefono ? "border-rose-400" : "border-slate-300"
              }`}
            />
            {errors.telefono && (
              <p className="text-xs font-medium text-rose-600">
                {errors.telefono.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={cancelarEdicion}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}