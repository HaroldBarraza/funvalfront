import { useState } from 'react'
import { MetriCard } from './components/MetricCard'
import { StatusBadge } from './components/StatusBadge'
import type { Metricard } from './types'
import './App.css'

function App() {
  const [/* count, setCount */] = useState(0)
  const [pacientes, setPacientes] = useState(128);
  const [Mantenimiento, setMantenimiento] = useState(false);
  const metricas: Metricard[] = [
    {id: "1", titulo: "Pacientes", valor: pacientes, description: "Pacientes registrados", tendecia: "positiva", icono: "🩺"},
    {id: "2", titulo: "citas", valor: 15, description: "Citas", tendecia: "negativa", icono: "📅"},
    {id: "3", titulo: "consultas", valor: 5, description: "Consultas", tendecia: "neutra", icono: "🚑"},
    {id: "4", titulo: "disponibilidad", valor:"85%", description: "Disponibilidad del sistema", tendecia: "positiva", icono: "🔧"}

  ]
  return (
    <div className="bg-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        {Mantenimiento && (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 from-amber-50 to-orange-50 px-5 py-3 text-sm font-medium text-amber-800 ">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            </span>
            El sistema está en mantenimiento
          </div>
        )}

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="from-slate-900 to-slate-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Dashboard Clínica
                </h1>
                <p className="text-sm text-slate-500">
                  Resumen del sistema en tiempo real
                </p>
              </div>
            </div>
          </div>
          <StatusBadge activo={!Mantenimiento} />
        </header>

        {/* Acciones */}
        <section className="flex flex-wrap gap-3">
          <button
            onClick={() => setPacientes((prev) => prev + 1)}
            className="group inline-flex items-center gap-2 rounded-xl from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white bg-green-600"
          >
            <span className="text-base leading-none transition-transform group-hover:scale-125">+</span>
            Paciente
          </button>

          <button
            onClick={() => setPacientes((prev) => Math.max(0, prev - 1))}
            className="group inline-flex items-center gap-2 rounded-xl from-rose-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white bg-red-600"
          >
            <span className="text-base leading-none transition-transform group-hover:scale-125">−</span>
            Paciente
          </button>

          <button
            onClick={() => setMantenimiento((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-offset-2 ${
              Mantenimiento
                ? 'border-emerald-200 bg-white text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-emerald-500'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-slate-500'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${Mantenimiento ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {Mantenimiento ? 'Desactivar mantenimiento' : 'Activar mantenimiento'}
          </button>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {metricas.map((m) => (
            <MetriCard key={m.id} metrica={m} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
