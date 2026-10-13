export type Tendencias = "positiva" | "negativa" | "neutra"

export interface Metricard{
    id: string;
    titulo: string;
    valor: number | string;
    description: string;
    tendecia: Tendencias;
    icono: string;
}
