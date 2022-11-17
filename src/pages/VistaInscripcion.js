import React from "react";
import ContenedorSol from "../components/ContenedorSol";
import HomePage from "../components/homePage";



import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
function VistaInscripcion (){
    const fecha = new Date();
    const [limite, setlimite] = useState('');
    useEffect(() => {
    async function obtenerFecha() {
  
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
         
          setlimite(docSnap.data().LimiteInscrip.toDate());
         
          // console.log(fechaIniConvocatoria,limitePreInsc,limiteInscrip)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
       
      }
      
      obtenerFecha();
    }, []);

    console.log("fecha actual", fecha);
    console.log("fecha de la base", limite);
    return (
        <div>
            <HomePage/>
            {fecha > limite ?
            <div id="contenedor" className="row cont-main-form mt-5 mb-5 mx-0">
            <h1 className="col-4 ">Está fuera de la fecha de inscripción de equipos para el campeonato.</h1>
            </div>
            :
            <ContenedorSol titulo='Solicitudes de Inscripción' subtitulo=''/>
            }
        </div>

    );
}

export default VistaInscripcion;