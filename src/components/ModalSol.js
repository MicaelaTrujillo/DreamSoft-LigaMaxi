import Modal from 'react-bootstrap/Modal';
import {Boton,FormInputs, FormContraseña} from '../Elementos/ElementosForms';
import Button from 'react-bootstrap/Button';

function ModalSol(props){
    return (
        <Modal
          {...props}
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
            <div>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}
export default ModalSol;