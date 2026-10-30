import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  Stethoscope,
  User,
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";
import {
  getPaginadas,
  nombreMedico,
  nombrePaciente,
  labelEstado,
} from "../service/citas";
import type { CitasApi, RespuestaPaginada } from "../service/citas";
import { extraerMensajeError } from "../libs/errorHandler";
import { SkeletonCitaRow } from "../shared/components/skeletons/SkeletonCitaRow";
import { EstadoVacio } from "../shared/components/ui/EstadoVacio";
import { AlertaBanner } from "../shared/components/ui/AlertaBanner";

const POR_PAGINA = 10;

const ESTADOS_FILTRO = [
  { value: "Todos", label: "Todos" },
  { value: "Programada", label: "Programada" },
  { value: "Completada", label: "Completada" },
  { value: "Cancelada", label: "Cancelada" },
] as const;

type EstadoFiltro = (typeof ESTADOS_FILTRO)[number]["value"];

export default function PaginaHistorialCitas() {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginaParam = Number(searchParams.get("pagina")) || 1;
  const estadoParam = (searchParams.get("estado") ?? "Todos") as EstadoFiltro;

  const [respuesta, setRespuesta] =
    useState<RespuestaPaginada<CitasApi> | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    setError(null);

    getPaginadas(
      paginaParam,
      POR_PAGINA,
      estadoParam === "Todos" ? undefined : estadoParam,
      controller.signal,
    )
      .then(setRespuesta)
      .catch((err) => {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(extraerMensajeError(err));
        }
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, [paginaParam, estadoParam]);

  const irAPagina = (nueva: number) => {
    setSearchParams({ pagina: String(nueva), estado: estadoParam });
  };

  const cambiarEstado = (nuevoEstado: EstadoFiltro) => {
    setSearchParams({ pagina: "1", estado: nuevoEstado });
  };

  const citas = respuesta?.data ?? [];
  const totalPaginas = respuesta?.totalPaginas ?? 1;
  const total = respuesta?.total ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <History size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Historial de citas
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Consulta todas las citas de la clínica.
          </p>
        </div>
      </header>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Estado:</label>
          <select
            value={estadoParam}
            onChange={(e) => cambiarEstado(e.target.value as EstadoFiltro)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {ESTADOS_FILTRO.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        {respuesta && !cargando && (
          <p className="text-xs font-medium text-slate-500">
            Página {respuesta.pagina} de {totalPaginas} — {total} registro
            {total !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-5">
          <AlertaBanner tipo="error" mensaje={error} />
        </div>
      )}

      {cargando ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: POR_PAGINA }).map((_, i) => (
            <SkeletonCitaRow key={i} />
          ))}
        </div>
      ) : citas.length === 0 ? (
        estadoParam === "Todos" ? (
          <EstadoVacio
            titulo="No hay citas registradas"
            descripcion="Cuando agendes citas, aparecerán aquí."
          />
        ) : (
          <EstadoVacio
            titulo={`No hay citas con estado "${estadoParam}"`}
            descripcion="Prueba con otro filtro o vuelve a ver todas las citas."
            accion={{
              label: "Ver todas",
              onClick: () => cambiarEstado("Todos"),
            }}
          />
        )
      ) : (
        <div className="flex flex-col gap-3">
          {citas.map((cita) => (
            <div
              key={cita.id_cita}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {nombrePaciente(cita)}
                    </p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      Cita #{cita.id_cita}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        cita.id_estado === 1
                          ? "bg-blue-50 text-blue-700"
                          : cita.id_estado === 2
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {labelEstado(cita.id_estado)}
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
              </div>
            </div>
          ))}
        </div>
      )}

      {!cargando && respuesta && total > 0 && (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs font-medium text-slate-500">
            Página {respuesta.pagina} de {totalPaginas} — {total} registro
            {total !== 1 ? "s" : ""}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => irAPagina(paginaParam - 1)}
              disabled={paginaParam <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <button
              type="button"
              onClick={() => irAPagina(paginaParam + 1)}
              disabled={paginaParam >= totalPaginas}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}