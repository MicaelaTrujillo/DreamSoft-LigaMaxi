import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Boton,FormInputs, FormContraseña} from '../Elementos/ElementosForms';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/ConexionBD';
function ModalCmp({show, handleClose}) {
    
  const [password, cambiarPassword] = useState({campo: "", valido: null});
  const [correo, cambiarCorreo] = useState({campo: "", valido: null});
  const [formValido, cambiarFormValido] = useState({campo: "", valido: null});
  const expresiones = {
      nombreJugador: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
      password: /^.{6,10}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{7,8}$/, // 7 a 14 numeros.
      ci: /^\d{7,8}$/ // 7 a 14 numeros.
  }
    
  async function iniciarSesion(e){
    e.preventDefault();
    if( correo.valido === 'true' && password.valido === 'true'){
        cambiarFormValido(true);
        console.log("se inicia sesion", correo.campo, password.campo);
        signInWithEmailAndPassword(auth,correo.campo, password.campo);
      }else{
        console.log("no se inicia sesion");
      }
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormInputs
            estado={correo}
            cambiarEstado={cambiarCorreo} 
            expresionRegular = {expresiones.correo}   
            label="Correo:"
            placeholder="name@example.com"
            alerta="Formato valido name@example.com"
            id="3"
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
        </Modal.Body>
        <Modal.Footer>
          <Boton type='submit'
          texto='Iniciar'
          manejarClic={iniciarSesion}/>
          
        </Modal.Footer>
      </Modal>
  );
}

export default ModalCmp;