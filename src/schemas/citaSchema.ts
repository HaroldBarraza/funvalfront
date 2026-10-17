import { z } from "zod";

export const CitasForm = z.object({
  pacienteNombre: z
    .string()
    .trim()
    .min(3, { error: "tiene que tener como minimo 3 caracteres" }),
  medicoId: z.string().trim().min(1, { error: "el campo no pude estar vacio" }),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Formato YYYY-MM-DD" })
    .refine((val) => !isNaN(Date.parse(val)), { error: "Fecha inválida" })
    .refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
      error: "La fecha no puede ser pasada",
    }),
  hora: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { error: "formato de hora invalido" }),
  motivo: z
    .string()
    .min(10, { error: "tiene que tener como minimo 10 caracteres" })
    .max(500, { error: "el motivo no puede tener mas de 500 caracteres" }),
  urgencia: z.enum(["baja", "media", "alta", "critica"]),
});

export type CitaFromData = z.infer<typeof CitasForm>;