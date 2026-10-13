interface StatusBadgeProps{
    activo: boolean
}


export const StatusBadge=({activo}: StatusBadgeProps)=>{
    return(
        <div>
            <p className={activo === true ? "text-green-600" : "text-red-600"}>
                {activo == true ? "Sistema Operativo": "Modo Mantenimiento"}
                </p>
        </div>
    )
}