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
        
        <div className="row cont-main mt-5 mb-5 mx-0" >
                
            <Form className="form text-center container col-8 ">
                <h3 className="mb-5 mt-3">INFORMACIÓN DEL EQUIPO</h3>
                
                    <FormInputSinCambioEst
                        label="Nombre del equipo: "
                        value = "Jaguares"
                        
                    />
                    <FormInputSinCambioEst
                        label="Categoría: "
                        value = "35 años"
                        
                    />
                    <LabelForm className="mb-1 mt-1"
                        label="Delegado: "
                    />  
                    
                    <LabelForm
                        label="Entrenador: "
                    />  
                    <LabelForm
                        label="Jugadores: "
                    />  
            </Form>
            
        </div>
    );
    
}

export default InfoEquipo;