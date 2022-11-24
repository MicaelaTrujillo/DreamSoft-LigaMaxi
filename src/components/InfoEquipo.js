import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";

import {Link} from 'react-router-dom'
import "../styles sheet/infoEquipo.css";


function InfoEquipo({nombre}){
        var ent="";
        var categ="";
        const [categoriaa, setCateg] = useState([]);
        const [entrenadorr, setEntren] = useState([]);
        useEffect(() => {
          async function obtenerDatos() {
            const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombre);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              //console.log("si entra al exist", docSnap.data());
                categ=docSnap.data().Categoria;
                ent=docSnap.data().Entrenador;
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            
            setCateg(categ)
            setEntren(ent)
            //console.log("Si daaaaaa", categ,ent);
          }
          obtenerDatos();
        }, []);
        
        //console.log("Fueraaaa", categoriaa,entrenadorr);

    const [datosJug, setJugadores] = useState([]);
    useEffect(() => {
        
        getDocs(collection(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombre, "Jugadores")).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                //console.log("datoos",datos,datos.length);  
                setJugadores(datos);
        });
    }, []);

    return (
        
        <div className="container">
        <div className="main-inf row ">
            <div className="contenedor-Info row cont-main mt-5 mb-5 mx-0">
            
                <h2 className="tituloE">Información del Equipo</h2>

                <h2 className="nombre ">Nombre de Equipo: </h2>
                <div className="container-text">
                    <h2 className="text"> {nombre}</h2> 
                </div>
                
                <h2 className="nombre">Categoría: </h2>
                <div className="container-text">
                    <h2 className="text"> {categoriaa}</h2> 
                </div>
                
                <h2 className="nombre">Entrenador:</h2>
                <div className="container-text">
                    <h2 className="text"> {entrenadorr}</h2> 
                </div>


                <div className='container '>
                    <h2 className="nombre">Jugadores:</h2>
                            {
                                datosJug.map((jugador) => (
                                    
                                <div className="container-BJug">
                                    
                                    <Button
                                        className='botonJug'
                                        onClick="">
                                        <Link to={`/InformacionJugador/${nombre}/${jugador.nombreJugador}`} >{jugador.nombreJugador}</Link>
                                    
                                    </Button>
                                </div>

                                ))
                                            
                            } 
                </div>
            </div>
        </div>
        
        </div>
    );
    
}

export default InfoEquipo;