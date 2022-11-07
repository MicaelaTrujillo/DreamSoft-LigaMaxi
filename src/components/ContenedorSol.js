import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { Button } from "bootstrap";
import { async } from "@firebase/util";


function ContenedorSol(){
    const eqNoHabilitados = [];
    const [equiposNH, setENH] = useState([]);
    const eqHabilitados =[];

       /*getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes")).then(
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().Habilitado == false){
                      eqNoHabilitados.push(
                        {id: doc.id},
                        {nombre: doc.data().NombreEquipo}
                        )
                    }else{
                      eqHabilitados.push(doc.data())
                    }
                  });
                  //setENH(eqHabilitados);
        });*/
        
    useEffect (() => {
        getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes")).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("datoos",datos);  
                setENH(datos);
        });
    }, []);
       
        /*setENH(datos);*/
        console.log("Matriz de equipos NO habilitados", eqNoHabilitados);
        console.log("Matriz de equipos habilitados", eqHabilitados);
        console.log("aquiiiiiiii", equiposNH);
    
 

    return(
        <div className="main">
            <div className="contenedor-sol">
                <h2>EQUIPOS</h2>
                <p className="sub-titulo">Solicitudes de inscripción:</p>
                {equiposNH.map((user) => (
                 <TarjetaSol key = {user.id} name={user.NombreEquipo}/>
                 ))}
            </div>
        </div>
    );
}

export default ContenedorSol;