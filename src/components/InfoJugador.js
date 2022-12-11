import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom'
import "../styles sheet/infoEquipo.css";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';


function InfoJugador({nombreE, nombreJ} ){
    const {user} = useContext(UserContext);
    var nomJ="";
    var alt="";
    var pes="";
    var correO="";
    var ci="";
    var fecNac="";
    var fotO="";
    var fal="";
    var anot="";
    const [nombreJug, setNomJ] = useState([]);
    const [altura, setAlt] = useState([]);
    const [peso, setPeso] = useState([]);
    const [correo, setCorreo] = useState([]);
    const [carnet, setCi] = useState([]);
    const [fechaNac, setFecNac] = useState([]);
    const [faltas, setFalta] = useState([]);
    const [anota, setAnota] = useState([]);
    const [foto, setFoto] = useState([]);

    useEffect(() => {
      async function obtenerDatos() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombreE,"Jugadores",nombreJ);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          //console.log("si entra al exist", docSnap.data());
            nomJ=docSnap.data().nombreJugador;
            alt=docSnap.data().Altura;
            pes=docSnap.data().Peso;
            correO=docSnap.data().Correo;
            ci=docSnap.data().CI;
            fecNac=docSnap.data().FNac.toDate();
            //fecNac=(fecNac.getFullYear() + "-" + (fecNac.getMonth()+1 > 9? fecNac.getMonth()+1: "0" + (fecNac.getMonth()+1)) + "-" + (fecNac.getDate() > 9? fecNac.getDate(): "0" + fecNac.getDate()) + " "+ fecNac.toLocaleTimeString()).toString()
            //Formato empieza dia
            fecNac=((fecNac.getDate() > 9? fecNac.getDate(): "0" + fecNac.getDate())+ "/" + (fecNac.getMonth()+1 > 9? fecNac.getMonth()+1: "0" + (fecNac.getMonth()+1)) + "/" + fecNac.getFullYear()  ).toString()
            anot=docSnap.data().NumAnotaciones;
            fal=docSnap.data().NumFaltas;
            fotO=docSnap.data().Foto;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
        setNomJ(nomJ)
        setAlt(alt)
        setPeso(pes)
        setCorreo(correO)
        setCi(ci)
        setFecNac(fecNac)
        setAnota(anot)
        setFalta(fal)
        setFoto(fotO)
        //console.log("Si daaaaaa", nomJ);
      }
      obtenerDatos();
    }, []);
    
    //console.log("Fueraaaa", nomJ,alt);


return (
    
    <div className="container">
    <div className="main-inf row ">
        <div className="contenedor-Info row cont-main mt-5 mb-5 mx-0">
        
            <h2 className="tituloE">Datos personales</h2>

            <h2 className="nombre ">Apellido(s) y Nombre(s): </h2>
            <div className="container-text">
                <h2 className="text"> {nombreJug} </h2> 
            </div>
            
            <h2 className="nombre">Altura (m): </h2>
            <div className="container-text">
                <h2 className="text"> {altura} </h2> 
            </div>
            
            <h2 className="nombre">Peso (kg):</h2>
            <div className="container-text">
                <h2 className="text"> {peso} </h2> 
            </div>

            <h2 className="nombre">Correo: </h2>
            <div className="container-text">
                <h2 className="text"> {correo} </h2> 
            </div>

            <h2 className="nombre">Cédula de identidad:</h2>
            <div className="container-text">
                <h2 className="text"> {carnet} </h2> 
            </div>

            <h2 className="nombre">Fecha de nacimiento:</h2>
            <div className="container-text">
                <h2 className="text"> {fechaNac} </h2> 
            </div>

            <h2 className="nombre">Número de anotaciones: </h2>
            <div className="container-text">
                <h2 className="text"> {anota} </h2> 
            </div>

            <h2 className="nombre">Número de faltas:</h2>
            <div className="container-text">
                <h2 className="text"> {faltas} </h2> 
            </div>

            <h2 className="nombre">Foto:</h2>
            <img 
                className="fotoJug img-thumbnail mx-auto d-block "
                src ={foto}
            />
            
            <p></p>
            <>
            {user? 
            <Button
                className='botonCred'
                onClick="">
                <Link to={`/CredencialJugador/${nombreE}/${nombreJ}`} >Generar credencial</Link>
            </Button>
            : <p></p>
            }
            </>
            
            
            
            
        </div>
    </div>
    
    </div>
);

}

export default InfoJugador;