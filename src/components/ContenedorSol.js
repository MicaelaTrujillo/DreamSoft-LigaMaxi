import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";
import { db } from "../Firebase/ConexionBD";
import {getDocs,  collection,  where, query} from "firebase/firestore";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";

function ContenedorSol(props){
    const [equiposAdm, setAdm] = useState([]);
    const [equiposDel, setDel] = useState([]);
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
 
        useEffect (() => {
            getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes")).then(
                (querySnapshot) => {
                    const datos = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    //console.log("datoos",datos);  
                    setAdm(datos);
            });
        }, []);
    

        useEffect (() => {
        const q = query(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes"), where("Solicitante", "==", user.uid));
        
            getDocs(q).then((querySnapshot) =>{
                const datosDel = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));  
                setDel(datosDel);
            });
        }, []);

       
    return(
        <div className="container">
            <div className="main">
            <div className="contenedor-sol row cont-main mt-5 mb-5 mx-0">
                <h2 className="tituloE">{props.titulo}</h2>
                <p className="sub-titulo">{props.subtitulo}</p>
                {userRol==='Administrador'? 
                    equiposAdm.map((equipo) => (
                    <TarjetaSol key = {equipo.id} name={equipo.NombreEquipo} categoria={equipo.Categoria} imagen={equipo.UrlImagen} habilitado={equipo.Habilitado} fecha={equipo.FechaSol}/>
                    ))
                    
                  : 
                    equiposDel.map((equipo) => (
                    <TarjetaSol key = {equipo.id} name={equipo.NombreEquipo} categoria={equipo.Categoria} imagen={equipo.UrlImagen} habilitado={equipo.Habilitado} inscrito={equipo.Inscrito} fecha={equipo.FechaSol}/>
                    ))
                    
                }
            </div>
        </div>
        </div>
        
    );
}

export default ContenedorSol;