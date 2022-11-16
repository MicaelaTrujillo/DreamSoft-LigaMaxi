import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { Button } from "bootstrap";
import { async } from "@firebase/util";

import {FormInputs, Boton, FormArchivo, FormInputSinCambioEst, LabelForm} from '../Elementos/ElementosForms';
import "../styles sheet/infoEquipo.css";
import {Link} from 'react-router-dom'


function InfoEquipo(){
    return (
        
        <div className="container">
        <div className="main-inf">
            <div className="contenedor-Info row cont-main mt-5 mb-5 mx-0">
            
                <h2 className="tituloE">Información del Equipo</h2>

                <h2 className="nombre ">Nombre de Equipo: </h2>
                <div className="container-text">
                    <h2 className="text"> Los tigres</h2> 
                </div>
                
                <h2 className="nombre">Categoría: </h2>
                <div className="container-text">
                    <h2 className="text"> 35 años</h2> 
                </div>
                
                <h2 className="nombre">Entrenador:</h2>
                <div className="container-text">
                    <h2 className="text"> Juan Perez</h2> 
                </div>
                
                <h2 className="nombre">Jugadores:</h2>
                
            </div>
        </div>
        

    
        </div>
    );
    
}

export default InfoEquipo;