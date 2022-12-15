import React from "react";
import "../styles sheet/Rivales.css"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import {Link} from 'react-router-dom'
import { db } from "../Firebase/ConexionBD";
import {getDoc, doc} from "firebase/firestore";
import { useEffect } from "react";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";

function Rivales({partido, registrado, equipo1, equipo2, puntos1, puntos2}){
    const [puntosR, setReg]= useState();
    const [p1, setP1]= useState();
    const [p2, setP2]= useState();
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
    useEffect (() => {
        const data= async () =>{
            const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                if(docSnap.data().PuntosR){
                    setReg(docSnap.data().PuntosR);
                    setP1(docSnap.data().PuntosE1);
                    setP2(docSnap.data().PuntosE2);
                    console.log("q pasa", equipo1,equipo2,puntos1,puntos2,docSnap.data().PuntosR);
                }
                
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
        }
        data([])
        }, []);

    return(
        <div className="conteiner"> 
            <div className="container-text raw">
                <h2 className="text"> {equipo1}</h2> 
                <h2 className="text center"><b>vs</b></h2>
                <h2 className="text right"> {equipo2}</h2> 
            </div>
            {
                registrado?
                <>
                <div className="container-points raw">
                <h2 className="text"> {p1}</h2> 
                <h2 className="text center">-</h2>
                <h2 className="text right"> {p2}</h2>
                </div>
                </>
                :
                userRol==="Apuntador"?
                <Button
                className='botonHabilitado'
                onClick="">
                <Link to={`/FormularioPlanilla/${partido}/${equipo1}/${equipo2}`} >Resultados</Link>
        
                </Button>
                :
                
                <>
                <div className="container-points raw">
                
                <h2 className="text center"> No definido</h2>
                
                </div>
                </>
                
            }
        </div>
        
    );
}

export default Rivales;