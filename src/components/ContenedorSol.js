import React from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { Button } from "bootstrap";
import { async } from "@firebase/util";

function ContenedorSol(){
    const equipos =[];
    async function obtenerEquipos(){
        const querySnapshot = await getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          equipos.push(doc.data().NombreEquipo)
          console.log("Matriz de equipos", equipos);
        });
    }
    return(
        <div className="main">
            <div className="contenedor-sol">
                <h2>EQUIPOS</h2>
                <p>Solicitudes de inscripción:</p>
                <TarjetaSol/>
                <TarjetaSol/>
                <TarjetaSol/>
                <button onClick={obtenerEquipos}>ver equipos</button>
            </div>
        </div>
    );
}

export default ContenedorSol;