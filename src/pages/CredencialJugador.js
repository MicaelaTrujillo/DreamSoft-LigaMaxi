import React from "react";
import HomePage from "../components/homePage";
import Credencial from "../components/Credencial";
import {useParams} from 'react-router-dom';

function CredencialJugador(){
    const equipoAct = useParams();
    const jugadorAct = useParams();
    
    return(

       <div>
             <HomePage/>
             <Credencial nombreE={equipoAct.equipo} nombreJ={jugadorAct.jugador}/>
       </div>
    );
    
}

export default CredencialJugador;