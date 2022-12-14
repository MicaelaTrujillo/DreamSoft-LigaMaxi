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
                    var a= docSnap.data().FechaHora.toDate();
                    var b=new Date(a);
                    const year= b.getFullYear();
                    var mes= b.getMonth()+1;
                    var dia= b.getDate();
                    var hora= b.getHours();
                    var min= b.getMinutes();
                    if(hora <=9){hora="0"+hora};
                    if(min <=9){min="0"+min};
                    //const fechita= dia+"/"+mes+"/"+year;
                    const horita=hora+":"+min;
                    setFecha(horita);

                    //console.log("q pasa", equipo1,equipo2,puntos1,puntos2,fechita);
                    console.log(b);
                    console.log("unu",hora,min);
                
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