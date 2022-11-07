import React from "react";
import Button from 'react-bootstrap/Button';
import "../styles sheet/TarjetaSol.css";
import { useState } from "react";
import Modal from './ModalSol';


function TarjetaSol(props){
    const [modalShow, setModalShow] =  useState(false);
    
    

    return (
        <>
        <div className="contenedor-tarjeta">
        <span className="nom-tarjeta">{props.name}</span>
        
        <Button variant="primary" onClick={ () => setModalShow(true)}>Ver Información</Button>
        </div>
         <Modal show={modalShow}
        onHide={() => setModalShow(false)}/>
        </>
        
    
    );
}

export default TarjetaSol;