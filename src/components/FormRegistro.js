import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';
import {Boton,FormInputs,FormArchivo, FormContraseña,AleFinal} from '../Elementos/ElementosForms';
import { useContext, useState } from 'react';

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { UserContext } from '../context/userProvider';
import {app} from '../Firebase/ConexionBD';


function FormRegistro() { 
  const {registerUser} = useContext(UserContext);
  const auth = getAuth();
  const [nombre, cambiarNombre] = useState({campo: "", valido: null});
  const [ci, cambiarCi] = useState({campo: "", valido: null});
  const [correo, cambiarCorreo] = useState({campo: "", valido: null});
  const [telefono, cambiarTelefono] = useState({campo: "", valido: null});
  const [password, cambiarPassword] = useState({campo: "", valido: null});

 const [formValido, cambiarFormValido] = useState({campo: "", valido: null});

  const expresiones = {
      nombreJugador: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
      password: /^.{6,10}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{7,8}$/, // 7 a 14 numeros.
      ci: /^\d{7,8}$/ // 7 a 14 numeros.
  }


const manejarClic2 = () => {

  console.log("clicCancelar");
  cambiarNombre({campo:'',valido:null});
  cambiarCi({campo:'',valido:null});
  cambiarCorreo({campo:'',valido:null});
  cambiarTelefono({campo:'',valido:null});
  cambiarPassword({campo:'',valido:null});
}
const validar = (e) =>{
  //e.preventDefault();
  if(nombre.valido === 'true' &&
    ci.valido === 'true' &&
    correo.valido === 'true' &&
    telefono.valido === 'true' 
    
  ){
    cambiarFormValido(true);
    
    cambiarNombre({campo:'',valido:null});
    cambiarCi({campo:'',valido:null});
    cambiarCorreo({campo:'',valido:null});
    cambiarTelefono({campo:'',valido:null});
    cambiarPassword({campo:'',valido:null});
   
  }else{
    cambiarFormValido(false);
  }
}

    async function onSubmit(e){
      e.preventDefault();
      if( nombre.valido === 'true' &&
          ci.valido === 'true' &&
          correo.valido === 'true' &&
          telefono.valido === 'true' 
      ){
        cambiarFormValido(true);
        
        try{
          await registerUser(correo.campo, password.campo);
          const user = getAuth(app).currentUser.uid;
          console.log("estooo",user);
          setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Delegados", user), {
            NombreDelegado: nombre.campo,
            CI: ci.campo,
            Telefono: telefono.campo,
            Rol: 'Delegado'
          });
        }catch (error){
          console.log(error);
        }
        cambiarNombre({campo:'',valido:null});
        cambiarCi({campo:'',valido:null});
        cambiarCorreo({campo:'',valido:null});
        cambiarTelefono({campo:'',valido:null});
        cambiarPassword({campo:'',valido:null});
   
  }else{
    cambiarFormValido(false);
  }
   
    }

  return (
    <div className="App">
      <div className='container'>
        <div className='formulario'> 
          <h1>REGISTRO DE DELEGADO</h1>

            <FormInputs
                    estado={nombre}
                    cambiarEstado={cambiarNombre} 
                    expresionRegular = {expresiones.nombreJugador}   
                    label="Nombres(s) y Apellidos(s):"
                    placeholder="Juan Perez"
                    alerta="Solo se permiten entre 3 y 30 caracteres"
                    id="1"
                />

            <FormInputs
                    estado={ci}
                    cambiarEstado={cambiarCi} 
                    expresionRegular = {expresiones.ci}   
                    label="CI:"
                    placeholder="7700770"
                    alerta="Solo se permiten entre 7 y 8 numeros"
                    id="2"
                />
            
            <FormInputs
                    estado={correo}
                    cambiarEstado={cambiarCorreo} 
                    expresionRegular = {expresiones.correo}   
                    label="Correo:"
                    placeholder="name@example.com"
                    alerta="Formato valido name@example.com"
                    id="3"
                />

            <FormInputs
                    estado={telefono}
                    cambiarEstado={cambiarTelefono} 
                    expresionRegular = {expresiones.telefono}   
                    label="Telefono:"
                    placeholder="70707070"
                    alerta="Solo se permiten entre 7 y 8 numeros"
                    id="4"
                />


            <FormContraseña
                    label="Contraseña:"
                    placeholder="123456"
                    estado={password}
                    cambiarEstado={cambiarPassword}
                    expresionRegular={expresiones.password}
                    alerta="Debe tener entre 6 y 10 caracteres"
                    id="5"
                />

            <FormArchivo
              archivo="Foto:"
            />
            <div className='centrar'>
              <AleFinal/>
            </div>
            <div className='botones'>
              <Boton 
                texto='Cancelar'
                
                manejarClic={manejarClic2}/>

              <Boton type='submit'
                texto='Registrar'
                manejarClic={onSubmit}/>
            </div>
        </div>
      </div>
    
    </div>
  );
}

export default FormRegistro;
