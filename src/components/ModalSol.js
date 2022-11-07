import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {FormInputSinCambioEst, Boton, FormImagen} from '../Elementos/ElementosForms'


function ModalSol(props){
    async function habilitarIns(){
        console.log("aqui se deberia habilitar Inscripcion en el nav del delgado");
    }

    return (
        <Modal
        show={props.show} onHide={props.onHide} animation={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              PREINSCRIPCIÓN
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <FormInputSinCambioEst
                    label="Nombre del equipo: "
                    value = {props.nombre}
                />
                <FormInputSinCambioEst
                    label="Categoría: "
                    value = {props.categoria}
                />
                <div>Comprobante: </div>
                <FormImagen
                    archivo="Comprobante: "
                    imagen = {props.imagen}
                />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Boton 
                texto='Habilitar'
                type='submit'
                manejarClic= {habilitarIns}/>
          </Modal.Footer>
        </Modal>
      );
}
export default ModalSol;