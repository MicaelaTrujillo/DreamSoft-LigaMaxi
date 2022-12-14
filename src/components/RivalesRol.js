import React from "react";
import "../styles sheet/Rivales.css"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import {Link} from 'react-router-dom'
import { db } from "../Firebase/ConexionBD";
import {getDoc, doc} from "firebase/firestore";
import { useEffect } from "react";

function RivalesRol({partido, registrado, equipo1, equipo2, puntos1, puntos2}){
    const [puntosR, setReg]= useState();
    const [fecha, setFecha]= useState();
    useEffect (() => {
        const data= async () =>{
            const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                if(docSnap.data().PuntosR){
                    var a= docSnap.data().FechaHora.toDate();
                    var b=new Date(a);
                    const year= b.getFullYear();
                    var mes= b.getMonth()+1;
                    var dia= b.getDate();
                    if(dia <=9){dia="0"+dia};
                    if(mes <=9){mes="0"+mes};
                    const fechita= dia+"/"+mes+"/"+year;
                    setFecha(fechita);

                    //console.log("q pasa", equipo1,equipo2,puntos1,puntos2,fechita);
                    console.log("dia mes anio ",a);
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
                
                <div className="container-points raw">
                <h2 className="text"> {fecha}</h2> 
                
                
                </div>
                
           
        </div>
        
    );
}

export default RivalesRol;