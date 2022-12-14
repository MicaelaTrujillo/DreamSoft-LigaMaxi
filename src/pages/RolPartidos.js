import React from "react";
import ContenedorRolPartidos from "../components/ContenedorRolPartidos";
import HomePage from "../components/homePage";

function RolPartidos(){
    return(
       <div>
             <HomePage/>
             <ContenedorRolPartidos titulo="ROL DE PARTIDOS"/>
       </div>
             
            
    );
    
}

export default RolPartidos;