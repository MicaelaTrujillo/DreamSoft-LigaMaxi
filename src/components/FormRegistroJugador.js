import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';

import {Boton,FormInputs,FormInputs2,FormInputs3,FormInputs4,FormInputs5,FormInputs6,FormArchivo, FormContraseña,AleFinal,Alert,FormFecha,FormFecha2} from '../Elementos/ElementosForms';
import { useContext, useState } from 'react';
import {mandarNomEq} from './FormInscripcion'

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { UserContext } from '../context/userProvider';
import {app} from '../Firebase/ConexionBD';
import {useEffect } from 'react';
import {useParams} from 'react-router-dom';

function FormRegistroJugador() { 
  const equipo = useParams();
  const enlaceForm = '/Inscripciones/FormularioInscripcion/'+ equipo.equipo + "/" + equipo.categoria
  console.log("se paso el nombre",equipo.equipo,equipo.categoria)
  const [nombre, cambiarNombre] = useState({campo: "", valido: null});
  const [peso, cambiarPeso] = useState({campo: "", valido: null});
  const [altura, cambiarAltura] = useState({campo: "", valido: null});
  const [ci, cambiarCi] = useState({campo: "", valido: null});
  const [correo, cambiarCorreo] = useState({campo: "", valido: null});
  const [fecha, cambiarFecha] = useState({campo: "", valido: null});

 const [formValido, cambiarFormValido] = useState({campo: "", valido: null});

 const [comprobante, cambiarComprobante] = useState({campo: "", valido: null});

  const expresiones = {
      nombreJugador: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
      password: /^.{6,10}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      ci: /^\d{7,8}$/, // 7 a 14 numeros.
      altura: /^[0-9]+,[0-9]+$/,
      peso: /^\d{2,3}$/
  }


const manejarClic2 = () => {

  console.log("clicCancelar");
  cambiarNombre({campo:'',valido:null});
  cambiarCi({campo:'',valido:null});
  cambiarCorreo({campo:'',valido:null});
  cambiarFecha({campo:'',valido:null});
}
const validar = (e) =>{
  //e.preventDefault();
  if(nombre.valido === 'true' &&
    ci.valido === 'true' &&
    correo.valido === 'true'
    
  ){
    cambiarFormValido(true);
    
    cambiarNombre({campo:'',valido:null});
    cambiarCi({campo:'',valido:null});
    cambiarCorreo({campo:'',valido:null});
    cambiarFecha({campo:'',valido:null});
   
  }else{
    cambiarFormValido(false);
  }
}

    async function onSubmit(e){
      e.preventDefault();
      const fechaNac = new Date(fecha.campo)
      console.log("se esta registrando jugador")
      //uploadFile(comprobante.campo);
      await updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", equipo.equipo, "Jugadores", nombre.campo), {
        nombreJugador: nombre.campo,
        Altura: altura.campo,
        Peso: peso.campo,
        Correo: correo.campo,
        CI: ci.campo,
        FNac: fechaNac
        })

        alert("Jugador añadido exitosamente.")
   
    }

    
    function uploadFile(file){
       
        const storage = getStorage();
        const storageRef = ref(storage,"Jugadores/" + file.name);
        if (file.name != undefined && nombre.campo != ''){
            uploadBytes(storageRef, file).then(snapshot => {
            //console.log(snapshot,"hola")
            setTimeout(
              getDownloadURL(storageRef)
              .then((url) => {
                  console.log(url)
                  setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", equipo.equipo, "Jugadores", nombre.campo), {
                    nombreJugador: nombre.campo  ,
                    Foto: url
                      });
              }),5000)
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
            });
          }
    }

  uploadFile(comprobante.campo);

  return (
    <div className="App">
      <div className='container'>
        <div className='formulario'> 
          <h1>INSCRIPCIÓN JUGADOR</h1>

            <FormInputs
                    estado={nombre}
                    cambiarEstado={cambiarNombre} 
                    expresionRegular = {expresiones.nombreJugador}   
                    label="Apellidos(s) y Nombres(s):"
                    placeholder="Perez Juan"
                    alerta="Solo se permiten entre 3 y 30 caracteres"
                    id="1"
                />

                <FormInputs4
                    estado={altura}
                    cambiarEstado={cambiarAltura} 
                    expresionRegular = {expresiones.altura}   
                    label="Altura (m):"
                    placeholder="1,75"
                    alerta="La altura se debe ingresar en metros, con el siguiente formato: 1,70"
                    id="1"
                />

                <FormInputs5
                    estado={peso}
                    cambiarEstado={cambiarPeso} 
                    expresionRegular = {expresiones.peso}   
                    label="Peso (kg):"
                    placeholder="55"
                    alerta="El peso se debe ingresar en kilogramos, sin decimales"
                    id="1"
                />

                <FormInputs3
                    estado={correo}
                    cambiarEstado={cambiarCorreo} 
                    expresionRegular = {expresiones.correo}   
                    label="Correo:"
                    placeholder="name@example.com"
                    alerta="Formato valido name@example.com"
                    id="3"
                />

            <FormInputs2
                    estado={ci}
                    cambiarEstado={cambiarCi} 
                    expresionRegular = {expresiones.ci}   
                    label="Cedula de Identidad:"
                    placeholder="7700770"
                    alerta="Solo se permiten entre 7 y 8 numeros"
                    id="2"
                />
            
            <FormFecha2
                  label="Fecha de Nacimiento:"
                  estado={fecha}
                  cambiarEstado={cambiarFecha} 
                />

            

            <FormArchivo
              archivo="Foto:"
              estado={comprobante}
              cambiarEstado={cambiarComprobante}
              acepta = "image/*"
            />
            <div className='centrar'>
              <AleFinal/>
            </div>
            <div className='botones'>
              <Boton 
                texto='Cancelar'
                manejarClic={manejarClic2}
                enlace = {enlaceForm}/>

              <Boton type='submit'
                texto='Registrar'
                manejarClic={onSubmit}
                enlace={enlaceForm}/>
            </div>
        </div>
      </div>
    
    </div>
  );
}

export default FormRegistroJugador;