import { useState } from "react";
import { MetriCard } from "./components/MetricCard";
import { StatusBadge } from "./components/StatusBadge";
import type { Metricard } from "./types";
import PaginaPacientes from "./pages/PaginaPacientes";
import "./App.css";

function App() {
  const [pacientes, setPacientes] = useState(128);
  const [Mantenimiento, setMantenimiento] = useState(false);

  const [paginaActual, setPaginaActual] = useState<"dashboard" | "pacientes">(
    "dashboard",
  );

  const metricas: Metricard[] = [
    {
      id: "1",
      titulo: "Pacientes",
      valor: pacientes,
      description: "Pacientes registrados",
      tendecia: "positiva",
      icono: "🩺",
    },
    {
      id: "2",
      titulo: "citas",
      valor: 15,
      description: "Citas",
      tendecia: "negativa",
      icono: "📅",
    },
    {
      id: "3",
      titulo: "consultas",
      valor: 5,
      description: "Consultas",
      tendecia: "neutra",
      icono: "🚑",
    },
    {
      id: "4",
      titulo: "disponibilidad",
      valor: "85%",
      description: "Disponibilidad del sistema",
      tendecia: "positiva",
      icono: "🔧",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        {Mantenimiento && (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            </span>
            El sistema está en mantenimiento
          </div>
        )}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {paginaActual === "dashboard"
                ? "Dashboard Clínica"
                : "Lista de pacientes"}
            </h1>

            <p className="text-sm text-slate-300">
              {paginaActual === "dashboard"
                ? "Resumen del sistema en tiempo real"
                : "Consulta y revisa la información de tus pacientes"}
            </p>
          </div>

          <StatusBadge activo={!Mantenimiento} />
        </header>
        <nav className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPaginaActual("dashboard")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              paginaActual === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setPaginaActual("pacientes")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              paginaActual === "pacientes"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            Lista de pacientes
          </button>
        </nav>

        {paginaActual === "dashboard" ? (
          <>
            <section className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPacientes((prev) => prev + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <span className="text-base">+</span>
                Paciente
              </button>

              <button
                type="button"
                onClick={() => setPacientes((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <span className="text-base">−</span>
                Paciente
              </button>

              <button
                type="button"
                onClick={() => setMantenimiento((prev) => !prev)}
                className="rounded-xl border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                {Mantenimiento
                  ? "Desactivar mantenimiento"
                  : "Activar mantenimiento"}
              </button>
            </section>

            <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {metricas.map((m) => (
                <MetriCard key={m.id} metrica={m} />
              ))}
            </section>
          </>
        ) : (
          <PaginaPacientes />
        )}
      </div>
    </div>
  );
}

export default App;
