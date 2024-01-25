/* eslint-disable react/prop-types */
import "../TitleBar/TitleBar.modules.css"

export function TitleBar({titulo}){

    return(
        <div className="barra-titulo">
            <h2>{titulo}</h2>
        </div>
    )
}