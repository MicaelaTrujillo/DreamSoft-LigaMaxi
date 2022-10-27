import React from "react";
import Button from "react-bootstrap/esm/Button";
import "../styles sheet/TarjetaSol.css";

function TarjetaSol(){
    return (
            <div className="contenedor-tarjeta">
            <span className="nom-tarjeta">Nombre de equipo</span>
            <Button>Habilitado</Button>
        </div>
        
    );
}

export default TarjetaSol;