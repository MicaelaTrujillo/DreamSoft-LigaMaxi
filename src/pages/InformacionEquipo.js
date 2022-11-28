import React from "react";
import HomePage from "../components/homePage";
import InfoEquipo from "../components/InfoEquipo";
import {useParams} from 'react-router-dom';

function InformacionEquipo(){
    const equipoAct = useParams();
    console.log("en page del form de inscripcion",equipoAct);
    return(
        
       <div>
             <HomePage/>
             <InfoEquipo nombre={equipoAct.equipo}/>
       </div>
    );
    
}

export default InformacionEquipo;