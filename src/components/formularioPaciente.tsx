import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { pacienteSchema } from "../schemas/pacientesschema";
import type { PacienteFormData } from "../schemas/pacientesschema";
import { create } from "../service/pacientes";
import type { PacienteAPI } from "../service/pacientes";
import { extraerMensajeError } from "../service/errorHandler";

interface FormularioPacienteProps {
  onCreado: (paciente: PacienteAPI) => void;
}

export const FormularioPaciente = ({ onCreado }: FormularioPacienteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      name_paciente: "",
      appaterno_paciente: "",
      apmaterno_paciente: "",
      email: "",
      telefono: "",
      fecha_nacimiento: "",
      genero: "FEMENINO",
    },
  });

  const onSubmit = async (data: PacienteFormData) => {
    try {
      const res = await create(data);
      toast.success("Paciente registrado");
      onCreado(res.data.data);
      reset();
    } catch (err) {
      toast.error(extraerMensajeError(err));
    }
  };

  const inputBase =
    "rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Agregar paciente
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">Nombre *</label>
          <input
            type="text"
            placeholder="Ej: Juan"
            {...register("name_paciente")}
            className={`${inputBase} ${
              errors.name_paciente ? "border-rose-400" : "border-slate-300"
            }`}
          />
          {errors.name_paciente && (
            <p className="text-xs font-medium text-rose-600">
              {errors.name_paciente.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">
            Apellido paterno *
          </label>
          <input
            type="text"
            placeholder="Ej: Pérez"
            {...register("appaterno_paciente")}
            className={`${inputBase} ${
              errors.appaterno_paciente ? "border-rose-400" : "border-slate-300"
            }`}
          />
          {errors.appaterno_paciente && (
            <p className="text-xs font-medium text-rose-600">
              {errors.appaterno_paciente.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">
            Apellido materno *
          </label>
          <input
            type="text"
            placeholder="Ej: Gómez"
            {...register("apmaterno_paciente")}
            className={`${inputBase} ${
              errors.apmaterno_paciente ? "border-rose-400" : "border-slate-300"
            }`}
          />
          {errors.apmaterno_paciente && (
            <p className="text-xs font-medium text-rose-600">
              {errors.apmaterno_paciente.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">Email *</label>
          <input
            type="email"
            placeholder="Ej: juan@email.com"
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
          <label className="text-xs font-medium text-slate-700">
            Teléfono *
          </label>
          <input
            type="text"
            placeholder="Ej: 987654321"
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

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">
            Fecha de nacimiento *
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register("fecha_nacimiento")}
            className={`${inputBase} ${
              errors.fecha_nacimiento ? "border-rose-400" : "border-slate-300"
            }`}
          />
          {errors.fecha_nacimiento && (
            <p className="text-xs font-medium text-rose-600">
              {errors.fecha_nacimiento.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-700">Género *</label>
          <select
            {...register("genero")}
            className={`${inputBase} ${
              errors.genero ? "border-rose-400" : "border-slate-300"
            }`}
          >
            <option value="FEMENINO">Femenino</option>
            <option value="MASCULINO">Masculino</option>
          </select>
          {errors.genero && (
            <p className="text-xs font-medium text-rose-600">
              {errors.genero.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Agregar paciente"}
      </button>
    </form>
  );
};