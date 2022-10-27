import React from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";

function ContenedorSol(){
    return(
        <div className="main">
            <div className="contenedor-sol">
                <h2>EQUIPOS</h2>
                <p>Solicitudes de inscripción:</p>
                <TarjetaSol/>
                <TarjetaSol/>
                <TarjetaSol/>
            </div>
        </div>
    );
}

export default ContenedorSol;