import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { Button } from "bootstrap";
import { async } from "@firebase/util";


function ContenedorSol(){
    const [equiposNH, setENH] = useState([]);
        
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
       
        console.log("aquiiiiiiii", equiposNH);
    
 

    return(
        <div className="main">
            <div className="contenedor-sol">
                <h2>EQUIPOS</h2>
                <p className="sub-titulo">Solicitudes de inscripción:</p>
                {equiposNH.map((user) => (
                 <TarjetaSol key = {user.id} name={user.NombreEquipo} categoria={user.Categoria} imagen={user.UrlImagen}/>
                 ))}
            </div>
        </div>
    );
}

export default ContenedorSol;