import React from "react";
import ContenedorTablas from "../components/ContenedorTablas";
import HomePage from "../components/homePage";
import TablaReportes from "../components/TablaReportes";

function ReporteFaltas(){
    return(
       <div>
             <HomePage/>
             <ContenedorTablas titulo='Faltas' c4='Número de Faltas' buscar='NumFaltas' />
             
       </div>
             
            
    );
    
}

export default ReporteFaltas;