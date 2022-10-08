import QR from '../assets/qr.jpeg'
import "../styles sheet/FormPreinscripcion.css";
import Form from "react-bootstrap/Form";

function FormInputs({label, placeholder, estado, cambiarEstado, expresionRegular}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validarNombre = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
            }else{
                console.log("incorrecto")
            }
        }
    }

    return(
        <Form.Group className="mb-3 d-block">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control
                className="form-control"
                type="text"
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validarNombre}
                onBlur={validarNombre}
            />
            <p>Alerta de error</p>
        </Form.Group>
    )
}


function FormComboBox({arreglo}){
    return(
        <Form.Group className="mb-3 d-block">
        <Form.Label className="w-100 text-start">Categoría: </Form.Label>
        <Form.Select>
          {arreglo.map(dato => (
            <option key={dato.toString()}>{dato}</option>
          ) )}
        </Form.Select>
      </Form.Group>
    )
}



function FormQR(){
    return(
        <Form.Group className="mb-4 text-center">
            <Form.Label className="w-100 d-block text-center">Nombre del equipo: </Form.Label>
            <img className="qr-imagen w-sm-50 w-md-25" src={QR}/>
        </Form.Group>
    )
}


function FormArchivo({archivo}){
    return(
        <Form.Group className="mb-4 d-block">
            <Form.Label className="w-100 text-start">{archivo}</Form.Label>
            <Form.Control className="form-control" type="file" id="formFile"
            />
        </Form.Group>
    )
}



function Boton({texto,manejarClic}){
    return(
        <button
            className='boton'
            onClick={manejarClic}>
            <p>{texto}</p>
        </button>
    );
}

function FormContraseña({label, placeholder}){

    return(
        <Form.Group className="mb-3 d-block" controlId="formBasicNombre">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control
                className="form-control"
                type="password"
                placeholder={placeholder}
            />
            <p>Alerta de error</p>
        </Form.Group>
    )
}

export {FormInputs, FormComboBox, FormQR, FormArchivo, Boton, FormContraseña}