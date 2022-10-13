import QR from '../assets/qr.jpeg'
import "../styles sheet/FormPreinscripcion.css";
import Form from "react-bootstrap/Form";

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


let res='w-100 xdx text-start';
function FormInputs({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    
    const validarNombre = () => {
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
                res='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                console.log("incorrecto")
                res='w-100 text-start alertaMal'+id
                cambiarEstado({...estado,valido:'false'})
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
                valido={estado.valido}
            />
                <Form.Label className={res}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}


function FormComboBox({label,arreglo, estado, cambiarEstado}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    return(
        <Form.Group className="mb-3 d-block">
        <Form.Label className="w-100 text-start">{label}</Form.Label>
        <Form.Select
            value={estado.campo}
            onChange={onChange}
        >
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


function FormArchivo({archivo, estado, cambiarEstado}){
 
    const onChange = (e) => {
        cambiarEstado(e.target.files[0]);
        
    }
    

    return(
        <Form.Group className="mb-4 d-block">
            <Form.Label className="w-100 text-start">{archivo}</Form.Label>
            <Form.Control className="form-control" type="file" id="formFile"
                
                onChange={onChange}
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

function AleFinal(){
    return(
        <p>'Ingrese todos los datos correctamente por favor'</p>
    );
}

function FormContraseña({label, placeholder, estado,cambiarEstado,expresionRegular,alerta,id}){

        const onChange = (e) => {
            cambiarEstado({...estado, campo: e.target.value});
        }
        const validarNombre = () => {
            if(expresionRegular){   
                if(expresionRegular.test(estado.campo)){
                    console.log("correcto")
                    res='w-100  text-start alertaBien'+id
                    cambiarEstado({...estado,valido:'true'})
                }else{
                    console.log("incorrecto")
                    res='w-100 text-start alertaMal'+id
                    cambiarEstado({...estado,valido:'false'})
                }
            }
        }
    return(
        <Form.Group className="mb-3 d-block" controlId="formBasicNombre">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control
                className="form-control"
                type="password"
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validarNombre}
                onBlur={validarNombre}
            />
            <Form.Label className={res}>{alerta}</Form.Label>  
        </Form.Group>
    )
}

export {FormInputs, FormComboBox, FormQR, FormArchivo, Boton, FormContraseña,AleFinal}