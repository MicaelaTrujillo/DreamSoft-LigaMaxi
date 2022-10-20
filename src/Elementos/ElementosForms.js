import "../styles sheet/FormPreinscripcion.css";
import Form from "react-bootstrap/Form";

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import QR from '../assets/qr.jpeg'
import QRwebsis from '../assets/qrWebsis.png'
import { useState } from "react";

let res='w-100 xdx text-start';
function FormInputs({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    
    const validarNombre = () => {
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                //console.log("correcto")
                res='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                //console.log("incorrecto")
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
    var qrGenerado=""
async function generarQR(){
    var fechaIniConvocatoria= ""
    var limitePreInsc= ""
    var limiteInscrip= ""
    const fecha = +new Date();
    //console.log("actual",fecha);

    const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        fechaIniConvocatoria= docSnap.data().FechaIniConvocatoria;
        limitePreInsc= docSnap.data().LimitePreInsc;
        limiteInscrip= docSnap.data().LimitePreInscrip;
       // console.log(fechaIniConvocatoria,limitePreInsc,limiteInscrip)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    
    //Generamos qr
    if(fecha >= fechaIniConvocatoria && fecha <= limitePreInsc){
        qrGenerado = QR;
    }else{
        if(fecha > limitePreInsc && fecha <= limiteInscrip){
            qrGenerado = QRwebsis;
        }else{
            //AQUI SE CERRARIA FORMULARIO
        }
    }
 }

generarQR()
    return(
        <Form.Group className="mb-4 text-center">
            <Form.Label className="w-100 d-block text-center">Nombre del equipo: </Form.Label>
                <img className="qr-imagen w-sm-50 w-md-25" src={QR}/>
        </Form.Group>
    )
}


function FormArchivo({archivo, estado, cambiarEstado}){
 
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.files[0]});
        /*const storage = getStorage();
        const storageRef = ref(storage,"Comprobantes/" + e.target.files[0].name);
        
            uploadBytes(storageRef, e.target.files[0]).then(snapshot => {
            //console.log(snapshot,"hola")
            })*/
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

let resCont='w-100 xdx text-start alertaBien';
function FormContraseña({label, placeholder, estado,cambiarEstado,expresionRegular,alerta,id}){

        const onChange = (e) => {
            cambiarEstado({...estado, campo: e.target.value});
        }
        const validarNombre = () => {
            if(expresionRegular){   
                if(expresionRegular.test(estado.campo)){
                    console.log("correcto")
                    resCont='w-100  text-start alertaBien'+id
                    cambiarEstado({...estado,valido:'true'})
                }else{
                    console.log("incorrecto")
                    resCont='w-100 text-start alertaMal'+id
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
            <Form.Label className={resCont}>{alerta}</Form.Label>  
        </Form.Group>
    )
}

let res='w-100 xdx text-start alertaBien';
function FormInputs({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res='w-100 xdx text-start ' 
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
let res2='w-100 xdx text-start alertaBien';
function FormInputs2({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res2='w-100 xdx text-start ' 
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
                res2='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                console.log("incorrecto")
                res2='w-100 text-start alertaMal'+id
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
                <Form.Label className={res2}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}

let res3='w-100 xdx text-start alertaBien';
function FormInputs3({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res3='w-100 xdx text-start ' 
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
                res3='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                console.log("incorrecto")
                res3='w-100 text-start alertaMal'+id
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
                <Form.Label className={res3}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}
let res4='w-100 xdx text-start alertaBien';
function FormInputs4({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res4='w-100 xdx text-start ' 
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
                res4='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                console.log("incorrecto")
                res4='w-100 text-start alertaMal'+id
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
                <Form.Label className={res4}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}

export {FormInputs,FormInputs2,FormInputs3,FormInputs4, FormComboBox, FormQR, FormArchivo, Boton, FormContraseña,AleFinal}ox, FormQR, FormArchivo, Boton, FormContraseña,AleFinal}