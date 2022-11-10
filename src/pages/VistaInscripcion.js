import React from "react";
import ContenedorSol from "../components/ContenedorSol";
import HomePage from "../components/homePage";

function VistaInscripcion (){
    return (
        <div>
            <HomePage/>
            <ContenedorSol titulo='Solicitudes de Inscripción' subtitulo=''/>
        </div>

    );
}

export default VistaInscripcion;