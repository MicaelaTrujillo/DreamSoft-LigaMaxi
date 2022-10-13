import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Boton,FormInputs,FormArchivo, FormContraseña} from '../Elementos/ElementosForms';
function ModalCmp({show, handleClose}) {
    
  const [password, cambiarPassword] = useState({campo: "", valido: null});
    const expresiones = {
        nombreJugador: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
        password: /^.{6,10}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,8}$/, // 7 a 14 numeros.
        ci: /^\d{7,8}$/ // 7 a 14 numeros.
    }
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormInputs
            estado={'nombre'}
            cambiarEstado={'cambiarNombre'} 
            expresionRegular = {'expresiones.nombreEquipo'}   
            label="Correo:"
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
          <Boton
          texto='Iniciar'
          manejarClic={handleClose}/>
          
        </Modal.Footer>
      </Modal>
  );
}

export default ModalCmp;