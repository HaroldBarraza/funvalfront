import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { EstadoPaciente, Paciente } from "../types/paciente";

interface FormularioPacienteProps {
  onAgregar: (paciente: Omit<Paciente, "id">) => void;
}

interface FormState {
  nombre: string;
  apellido: string;
  email: string;
  estado: EstadoPaciente;
}

const FORM_INICIAL: FormState = {
  nombre: "",
  apellido: "",
  email: "",
  estado: "activo",
};

export const FormularioPaciente = ({ onAgregar }: FormularioPacienteProps) => {
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.email.trim()) {
      setError("Nombre y email son obligatorios");
      return;
    }

    onAgregar({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      estado: form.estado,
      telefono: "—",
      especialidadAsignada: "Sin asignar",
      ultimaCita: "—",
    });

    setForm(FORM_INICIAL);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-xl border border-slate-700 bg-slate-800 p-4"
    >
      <h2 className="mb-3 text-sm font-semibold text-white">
        Agregar paciente
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre *"
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
        />
        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="en_espera">En espera</option>
        </select>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-rose-400">{error}</p>
      )}

      <button
        type="submit"
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Agregar
      </button>
    </form>
  );
};