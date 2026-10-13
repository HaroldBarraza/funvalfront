import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import type { Paciente } from "../types/paciente";
import { SearchBar } from "../components/serarchbar";
import { PacientesCards } from "../components/PacientesCards";
import { Pacientesdata } from "../data/pacientes";

export default function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState("");
  const [pacientes] = useState<Paciente[]>(Pacientesdata);

  const pacientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) {
      return pacientes;
    }

    return pacientes.filter((p) => {
      const nombreCompleto = `${p.nombre} ${p.apellido}`.toLowerCase();
      const email = p.email.toLowerCase();

      return nombreCompleto.includes(termino) || email.includes(termino);
    });
  }, [busqueda, pacientes]);

  return (
    <div className="min-h-screen bg-black-50">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Users size={22} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-green-800 md:text-2xl">
              Pacientes
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">
              Lista de pacientes registrados en el sistema.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <SearchBar value={busqueda} onchange={setBusqueda} />
        </div>

        <p className="mb-3 text-xs font-medium text-slate-400">
          {pacientesFiltrados.length} paciente
          {pacientesFiltrados.length !== 1 ? "s" : ""}
        </p>

        {pacientesFiltrados.length > 0 ? (
          <div className="flex flex-col gap-3">
            {pacientesFiltrados.map((paciente) => (
              <PacientesCards key={paciente.id} paciente={paciente} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-500">
              No se encontraron pacientes que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
