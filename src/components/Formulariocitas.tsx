import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CitasForm } from "../schemas/citaSchema";
import type { CitaFromData } from "../schemas/citaSchema";
import { useMedico } from "../hooks/useMedicos";
import { useNavigate } from "react-router-dom";

export const FormularioCita = () => {
  const navigate = useNavigate();
  const { medicos, cargando } = useMedico();
  const [citaCreada, setCitaCreada] = useState<CitaFromData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CitaFromData>({
    resolver: zodResolver(CitasForm),
    defaultValues: {
      pacienteNombre: "",
      medicoId: "",
      fecha: "",
      hora: "",
      motivo: "",
      urgencia: "baja",
    },
  });

  const onSubmit = async (data: CitaFromData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCitaCreada(data);
  };

  const agendarOtra = () => {
    reset();
    setCitaCreada(null);
  };

  if (citaCreada) {
    const medicoSeleccionado = medicos.find(
      (m) => m.id === citaCreada.medicoId,
    );

    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-lg font-semibold text-emerald-800">
          Cita agendada
        </h2>

        <div className="mt-4 flex flex-col gap-1.5 text-sm text-emerald-900">
          <p>
            <strong>Paciente:</strong> {citaCreada.pacienteNombre}
          </p>
          <p>
            <strong>Médico:</strong>{" "}
            {medicoSeleccionado
              ? `${medicoSeleccionado.nombre} — ${medicoSeleccionado.especialidad}`
              : "No encontrado"}
          </p>
          <p>
            <strong>Fecha:</strong> {citaCreada.fecha}
          </p>
          <p>
            <strong>Hora:</strong> {citaCreada.hora}
          </p>
          <p>
            <strong>Motivo:</strong> {citaCreada.motivo}
          </p>
          <p>
            <strong>Urgencia:</strong> {citaCreada.urgencia}
          </p>
        </div>

        <button
          type="button"
          onClick={agendarOtra}
          className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Agendar otra cita
        </button>
      </div>
    );
  }

  const hoy = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">
          Nombre del paciente
        </label>
        <input
          type="text"
          {...register("pacienteNombre")}
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.pacienteNombre ? "border-rose-400" : "border-slate-200"
          }`}
        />
        {errors.pacienteNombre && (
          <p className="text-xs text-rose-600">
            {errors.pacienteNombre.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Médico</label>
        <select
          {...register("medicoId")}
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.medicoId ? "border-rose-400" : "border-slate-200"
          }`}
        >
          {cargando ? (
            <option disabled>Cargando médicos...</option>
          ) : (
            <>
              <option value="">Selecciona un médico</option>
              {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} — {m.especialidad}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.medicoId && (
          <p className="text-xs text-rose-600">{errors.medicoId.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Fecha</label>
        <input
          type="date"
          min={hoy}
          {...register("fecha")}
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.fecha ? "border-rose-400" : "border-slate-200"
          }`}
        />
        {errors.fecha && (
          <p className="text-xs text-rose-600">{errors.fecha.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Hora</label>
        <input
          type="text"
          placeholder="HH:MM"
          {...register("hora")}
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.hora ? "border-rose-400" : "border-slate-200"
          }`}
        />
        {errors.hora && (
          <p className="text-xs text-rose-600">{errors.hora.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Motivo</label>
        <textarea
          rows={3}
          placeholder="Describe brevemente el motivo de la consulta..."
          {...register("motivo")}
          className={`resize-none rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.motivo ? "border-rose-400" : "border-slate-200"
          }`}
        />
        {errors.motivo && (
          <p className="text-xs text-rose-600">{errors.motivo.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Urgencia</label>
        <select
          {...register("urgencia")}
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-blue-400 ${
            errors.urgencia ? "border-rose-400" : "border-slate-200"
          }`}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>
        {errors.urgencia && (
          <p className="text-xs text-rose-600">{errors.urgencia.message}</p>
        )}
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-500 hover:text-[#101828]"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Agendando..." : "Agendar cita"}
        </button>
      </div>
    </form>
  );
};