import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaEquipo";
import { db } from "../Firebase/ConexionBD";
import {getDocs,  collection,  where, query} from "firebase/firestore";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";

function ContenedorEquipo(props){
    const [equiposInscritos, setEquipos] = useState([]);
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
 
        useEffect (() => {
            getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos")).then(
                (querySnapshot) => {
                    const datos = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    //console.log("datoos",datos);  
                    setEquipos(datos);
            });
        }, []);
    

    return(
        <div className="container">
            <div className="main">
            <div className="contenedor-sol row cont-main mt-5 mb-5 mx-0">
                <h2 className="tituloE">EQUIPOS</h2>
                <p className="sub-titulo">{props.subtitulo}</p>
                {
                    equiposInscritos.map((equipo) => (
                    <TarjetaSol key = {equipo.id} name={equipo.NombreEquipo} categoria={equipo.Categoria} delegado={equipo.Delegado} entrenador={equipo.Entrenador}/>
                    ))
                    
                }
            </div>

        </div>
        </div>
        
    );
}

export default ContenedorEquipo;