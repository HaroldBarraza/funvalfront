import { useEffect } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useApi } from "../hooks/useApi";
import { useCitasStado } from "../stores/citasStoer";
import { getEspecialidad } from "../service/reportes";

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`}></div>
);

const rangFechas = (() => {
  const hoy = new Date();
  const sixmonth = new Date();
  sixmonth.setMonth(hoy.getMonth() - 6);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { inicio: fmt(sixmonth), fin: fmt(hoy) };
})();

export default function PaginaReportes() {
  const citas = useCitasStado((s) => s.citas) ?? [];
  const cargandoCitas = useCitasStado((s) => s.cargando);
  const cargarCitas = useCitasStado((s) => s.cargarTodas);

  const { data: especialidades, cargando: cargandoEspecialidades } = useApi(
    () =>
      getEspecialidad(rangFechas.inicio, rangFechas.fin).then(
        (r) => r.data.data,
      ),
  );

  useEffect(() => {
    if (citas.length === 0) cargarCitas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sevendays = Array.from({ length: 7 }, (_, i) => {
    const fechas = new Date();
    fechas.setDate(fechas.getDate() - (6 - i));
    return fechas;
  });

  const datosPorDia = sevendays.map((fechas) => {
    const dia = String(fechas.getDate()).padStart(2, "0");
    const mes = String(fechas.getMonth() + 1).padStart(2, "0");
    const year = fechas.getFullYear();
    const fechStr = `${dia}/${mes}/${year}`;
    const total = citas.filter((c) => c.fecha_de_cita === fechStr).length;
    return { dia: `${dia}/${mes}`, total };
  });

  const cargandGraficos = cargandoEspecialidades || cargandoCitas;
  const sinDatsosEspecialidades =
    !cargandoEspecialidades && (!especialidades || especialidades.length === 0);
  const sinDatosPorDia = !cargandoCitas && citas.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <BarChart3 size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Visualiza las tendencias de la clínica.
          </p>
        </div>
      </header>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">
            Citas por especialidad
          </h2>
          <span className="ml-auto text-xs text-slate-400">
            Últimos 6 meses
          </span>
        </div>

        {cargandGraficos ? (
          <Skeleton className="h-75 w-full" />
        ) : sinDatsosEspecialidades ? (
          <div className="flex h-75 items-center justify-center text-sm text-slate-500">
            No hay datos para mostrar.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={especialidades ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="especialidad" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <h2 className="font-semibold text-slate-900">
            Citas por día (últimos 7)
          </h2>
        </div>

        {cargandGraficos ? (
          <Skeleton className="h-75 w-full" />
        ) : sinDatosPorDia ? (
          <div className="flex h-75 items-center justify-center text-sm text-slate-500">
            No hay citas registradas.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: "#10b981" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>
    </div> 
  );
}