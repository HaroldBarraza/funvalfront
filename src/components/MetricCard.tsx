import type { Metricard,  Tendencias} from "../types";

interface MetricardProps{
    metrica : Metricard
}
const colorPorTendencias: Record<Tendencias,string> = {
    positiva: "text-esmeral-600",
    negativa: "text-rose-600",
    neutra: "text-slate-600"
}

export const MetriCard = ({metrica}: MetricardProps) => {
    return(
        <div>
            <div>
                <h2>{metrica.titulo}</h2>
                <span>{metrica.icono}</span>
            </div>
            <p>{metrica.valor}</p>
            <p className={`${colorPorTendencias[metrica.tendecia]}`} >{metrica.description}</p>
        </div>
    )
}