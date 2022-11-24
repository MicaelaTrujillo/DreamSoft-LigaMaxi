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
    const {user} = useContext(UserContext);
    //const userRol = GetRolUser(user);
    const [eqHabilitado, setHab]= useState(false);

    useEffect (() => {
        const data= async () =>{
            const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", props.name);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                if(docSnap.data().Habilitado){
                    setHab(docSnap.data().Habilitado);
                    //console.log("esta habilitad0",docSnap.data().Habilitado);
                }
                
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
        }
        data([])
        }, []);

    
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