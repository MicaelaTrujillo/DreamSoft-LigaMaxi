import React from "react";
import "../styles sheet/Rivales.css"

function Rivales({equipo1, equipo2, puntos1, puntos2}){
    return(
        <div className="conteiner"> 
            <div className="container-text raw">
                <h2 className="text"> {equipo1}</h2> 
                <h2 className="text center"><b>vs</b></h2>
                <h2 className="text right"> {equipo2}</h2> 
            </div>
            <div className="container-points raw">
                <h2 className="text"> {puntos1}</h2> 
                <h2 className="text center">-</h2>
                <h2 className="text right"> {puntos2}</h2>
            </div>
        </div>
        
    );
}

export default Rivales;