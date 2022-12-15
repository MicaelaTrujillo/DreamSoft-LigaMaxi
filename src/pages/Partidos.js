import React from "react";
import ContenedorPartidos from "../components/ContenedorPartidos";
import HomePage from "../components/homePage";

function Partidos(){
    return(
       <div>
             <HomePage/>
             <ContenedorPartidos titulo='PARTIDOS' subtitulo=''/>
       </div>
    );
    
}

export default Partidos;