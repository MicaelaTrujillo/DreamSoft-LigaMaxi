import React from "react";
import HomePage from "../components/homePage";
import InfoJugador from "../components/InfoJugador";
import {useParams} from 'react-router-dom';

function InformacionJugador(){
    const equipoAct = useParams();
    const jugadorAct = useParams();
    
    return(

       <div>
             <HomePage/>
             <InfoJugador nombreE={equipoAct.equipo} nombreJ={jugadorAct.jugador}/>
       </div>
    );
    
}

export default InformacionJugador;