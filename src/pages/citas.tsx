import { useEffect } from "react";
import { CalendarDays, Stethoscope, User } from "lucide-react";
import toast from "react-hot-toast";
import { useCitasStado } from "../stores/citasStoer";
import { EstadoCita, nombreMedico, nombrePaciente } from "../service/citas";
import { extraerMensajeError } from "../libs/errorHandler";

export default function PaginaCitas() {
  const citas = useCitasStado((s) => s.citas) ?? [];
  const cargando = useCitasStado((s) => s.cargando);
  const error = useCitasStado((s) => s.error);
  const cargarTodas = useCitasStado((s) => s.cargarTodas);
  const actualizarEstado = useCitasStado((s) => s.actualizarEstado);

  useEffect(() => {
    if (citas.length === 0) cargarTodas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCambiarEstado = async (id: number, nuevoEstado: number) => {
    try {
      await actualizarEstado(id, nuevoEstado);
      toast.success("Estado actualizado");
    } catch (err) {
      toast.error(`Cambio revertido: ${extraerMensajeError(err)}`);
    }
  };

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="text-sm text-slate-500">Cargando citas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-4xl">⚠️</p>
        <h1 className="text-lg font-semibold text-slate-900">
          No se pudieron cargar las citas
        </h1>
        <p className="max-w-md text-sm text-slate-500">{error}</p>
        <button
          type="button"
          onClick={() => cargarTodas()}
          className="mt-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <CalendarDays size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Citas</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Gestiona el estado de las citas médicas.
          </p>
        </div>
      </header>

      <p className="mb-3 text-xs font-medium text-slate-500">
        {citas.length} cita{citas.length !== 1 ? "s" : ""} registrada
        {citas.length !== 1 ? "s" : ""}
      </p>

      {citas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <p className="text-sm text-slate-500">No hay citas registradas.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {citas.map((cita) => (
            <div
              key={cita.id_cita}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {nombrePaciente(cita)}
                    </p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      Cita #{cita.id_cita}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Stethoscope size={12} className="text-slate-400" />
                      {nombreMedico(cita)} —{" "}
                      {cita.medico.especialidades.name_especialidad}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} className="text-slate-400" />
                      {cita.fecha_de_cita} · {cita.hora_de_cita}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={12} className="text-slate-400" />
                      {cita.users.name_empleado} {cita.users.appaterno}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {cita.descripcion}
                  </p>
                </div>

                <div className="shrink-0">
                  <select
                    value={cita.id_estado}
                    onChange={(e) =>
                      handleCambiarEstado(cita.id_cita, Number(e.target.value))
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {EstadoCita.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
