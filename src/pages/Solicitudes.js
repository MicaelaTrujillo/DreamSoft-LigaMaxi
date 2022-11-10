import React from "react";
import ContenedorSol from "../components/ContenedorSol";
import HomePage from "../components/homePage";

function Solicitudes(){
    return(
       <div>
             <HomePage/>
             <ContenedorSol titulo='EQUIPOS' subtitulo='Solicitudes de inscripción:'/>
       </div>
    );
    
}

export default Solicitudes;