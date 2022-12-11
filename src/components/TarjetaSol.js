import React from "react";
import Button from 'react-bootstrap/Button';
import "../styles sheet/TarjetaSol.css";
import { useState } from "react";
import Modal from './ModalSol';
import {Link} from 'react-router-dom'
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";
import { db } from "../Firebase/ConexionBD";
import {getDoc, doc} from "firebase/firestore";
import { useEffect } from "react";

function TarjetaSol(props){
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
    const [modalShow, setModalShow] =  useState(false);
    const [eqHabilitado, setHab]= useState(false);

    useEffect (() => {
        const data= async () =>{
            const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", props.name);
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

        //console.log("fechas en tarjeta sol", props.name, props.fecha);
        
    return (
        <>
        <div className="contenedor-tarjeta">
        <span className="nom-tarjeta">{props.name}</span>
        <p></p>
        <p></p>
        {userRol==='Administrador'? 
            eqHabilitado?
              <Button className="botonHabilitado" disabled>Habilitado</Button>
              :
              <Button className="botonVerInfo"  onClick={ () => setModalShow(true)}>Ver Información</Button>
        :
            props.habilitado?
                props.inscrito?
                <Button className="botonVerInfo" variant="primary" disabled>Inscrito</Button>
                :
                <Link to={`/Inscripciones/FormularioInscripcion/${props.name}/${props.categoria}`}><Button className="botonVerInfo">Inscribir</Button></Link>

            :
            <Button className="botonHabilitado"  disabled>Inhabilitado</Button>
        }
        </div>

        <Modal show={modalShow} onHide={() => setModalShow(false)} deshabilitarBtn={()=> setHab(true)} nombre={props.name} categoria={props.categoria} imagen={props.imagen} fecha={props.fecha}/>
        </>
        
    
    );
}

export default TarjetaSol;