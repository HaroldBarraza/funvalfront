import { z } from "zod";

export const pacienteSchema = z.object({
  name_paciente: z
    .string()
    .trim()
    .min(3, { error: "El nombre debe tener al menos 3 caracteres" })
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      error: "El nombre solo puede tener letras",
    }),
  appaterno_paciente: z
    .string()
    .trim()
    .min(3, { error: "El apellido paterno debe tener al menos 3 caracteres" })
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      error: "El apellido solo puede tener letras",
    }),
  apmaterno_paciente: z
    .string()
    .trim()
    .min(3, { error: "El apellido materno debe tener al menos 3 caracteres" })
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      error: "El apellido solo puede tener letras",
    }),
  email: z
    .string()
    .trim()
    .min(1, { error: "El email es obligatorio" })
    .email({ error: "Email inválido" }),
  telefono: z
    .string()
    .trim()
    .min(5, { error: "El teléfono debe tener al menos 5 caracteres" })
    .regex(/^[0-9+\-\s()]+$/, { error: "Teléfono inválido" }),
  fecha_nacimiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Formato YYYY-MM-DD" })
    .refine(
      (val) => {
        const fecha = new Date(val);
        return !isNaN(fecha.getTime()) && fecha <= new Date();
      },
      { error: "La fecha de nacimiento no puede ser futura" },
    ),
  genero: z.enum(["MASCULINO", "FEMENINO"], {
    error: "Selecciona un género",
  }),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;