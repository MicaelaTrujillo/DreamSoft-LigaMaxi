import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaEquipo from "./TarjetaEquipo";
import { db } from "../Firebase/ConexionBD";
import {getDocs,  collection,  where, query, orderBy} from "firebase/firestore";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";
import Rivales from "./Rivales";

function ContenedorPlanilla(props){
    const [equiposRivales, setRivales] = useState([]);
    const [fechas, setFechas] = useState([]);
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
    const meses=['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dias=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
     
        useEffect (() => {
            const dataref= collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Partidos");
            const q = query(dataref, orderBy("FechaHora"));

            getDocs(q).then(
                (querySnapshot) => {
                    const datos = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    console.log("datoos PLANILLA",datos);  
                    setRivales(datos);
            });
        }, []);
        

          const a = equiposRivales.map((rivales, index) => (
            equiposRivales[index].FechaHora.toDate().getDate()+""+(equiposRivales[index].FechaHora.toDate().getMonth()+1)

          ));
          
          useEffect(() => {
            setFechas(a);
          }, []);
        
    return(
        <div className="container">
            <div className="main">
            <div className="contenedor-sol row cont-main mt-5 mb-5 mx-0">
                <h2 className="tituloE">{props.titulo}</h2>
                <p className="sub-titulo">{props.subtitulo}</p>
                 
                {equiposRivales.map((rivales, index) => (
                    //console.log(equiposRivales[index].id)
                    index === 0 ? 
                        <>
                        <p className="fecha">{dias[rivales.FechaHora.toDate().getDay()]+", " +rivales.FechaHora.toDate().getDate()+" de "+ meses[rivales.FechaHora.toDate().getMonth()]}</p>
                        <Rivales partido={rivales.id} equipo1={rivales.Equipo1} equipo2={rivales.Equipo2} puntos1={rivales.PuntosE1} puntos2={rivales.PuntosE2}/>
                        </>
                    : a[index-1] === equiposRivales[index].FechaHora.toDate().getDate()+""+(equiposRivales[index].FechaHora.toDate().getMonth()+1)?
                        <Rivales partido={rivales.id} equipo1={rivales.Equipo1} equipo2={rivales.Equipo2} puntos1={rivales.PuntosE1} puntos2={rivales.PuntosE2}/>
                    :
                        <>
                        <p className="fecha">{dias[rivales.FechaHora.toDate().getDay()]+", " +rivales.FechaHora.toDate().getDate()+" de "+ meses[rivales.FechaHora.toDate().getMonth()]}</p>
                        <Rivales partido={rivales.id} equipo1={rivales.Equipo1} equipo2={rivales.Equipo2} puntos1={rivales.PuntosE1} puntos2={rivales.PuntosE2}/>
                        </>
                        //console.log( "e", equiposRivales[index].FechaHora.toDate().getDate()+""+(equiposRivales[index].FechaHora.toDate().getMonth()+1))
                    
                ))}
            </div>
                

        </div>
        </div>
        
    );
}

export default ContenedorPlanilla;