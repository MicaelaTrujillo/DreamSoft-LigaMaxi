import React from "react";
import Button from 'react-bootstrap/Button';
import "../styles sheet/TarjetaSol.css";
import { useState } from "react";
//import Modal from './ModalSol';
import {Link} from 'react-router-dom'
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
//import { GetRolUser } from "../utyls/getRolUser";
import { db } from "../Firebase/ConexionBD";
import {getDoc, doc} from "firebase/firestore";
import { useEffect } from "react";
import InfoEquipo from "./InfoEquipo";

function TarjetaEquipo(props){
 

    
    return (
        <>
        <div className="contenedor-tarjeta">
        <span className="nom-tarjeta">{props.name}</span>
        <p></p>
        <p></p>
        {
              
            <Button
                className='botonHabilitado'
                onClick="">
                <Link to={`/InformacionEquipo/${props.name}`} >Ver equipo</Link>
            
            </Button>
        }
        </div>

       
        </>
        
    
    );
}

export default TarjetaEquipo;