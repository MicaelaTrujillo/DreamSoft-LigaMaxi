
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Boton,FormInputs,FormArchivo, FormContraseña} from '../Elementos/ElementosForms';
function ModalCmp({show, handleClose}) {

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