import React from "react";
import ContenedorTablas from "../components/ContenedorTablas";
import HomePage from "../components/homePage";
import TablaReportes from "../components/TablaReportes";

function ReporteAnotaciones(){
    return(
       <div>
             <HomePage/>
             <ContenedorTablas titulo='Anotaciones' c4='Número de Anotaciones' buscar='NumAnotaciones'/>
             
       </div>
             
            
    );
    
}

export default ReporteAnotaciones;