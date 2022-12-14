import "../styles sheet/FormPreinscripcion.css";
import Form from "react-bootstrap/Form";
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom'

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import QR from '../assets/qr.jpeg'
import QRwebsis from '../assets/qrWebsis.png'
import { useState } from "react";

function FormComboBox({label,arreglo, estado, cambiarEstado}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
        console.log(estado.campo)
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



function FormQR({imagen}){
  /*var qrGenerado2=""
async function generarQR(){
   // var fechaIniConvocatoria= ""
    //var limitePreInsc= ""
    //var limiteInscrip= ""
    const fecha = new Date();
    console.log("actual",fecha);

    const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
    const docSnap = await getDoc(docRef);
   
    if (docSnap.exists()) {
        console.log("si entra al exist", docSnap.data())
        var fechaIniConvocatoria= docSnap.data().FechaIniConvocatoria.toDate();
        var limitePreInsc= docSnap.data().LimitePreInsc.toDate();
        var limiteInscrip= docSnap.data().LimiteInscrip.toDate();
       // console.log(fechaIniConvocatoria,limitePreInsc,limiteInscrip)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log("fechas",fechaIniConvocatoria, limitePreInsc, limiteInscrip)
    //Generamos qr
    var qrGenerado=""
    if(fecha >= fechaIniConvocatoria && fecha <= limitePreInsc){
        console.log("imagen1")
        qrGenerado = imagen1;
    }else{
        if(fecha > limitePreInsc && fecha <= limiteInscrip){
            console.log("imagen2")
            qrGenerado = imagen2;
        }else{
            //AQUI SE CERRARIA FORMULARIO
        }
    }
    qrGenerado2 = qrGenerado
    console.log(qrGenerado2, "este es el 2")
 }
 generarQR()*/
console.log(imagen,"nanananna")
    return(
        <Form.Group className="mb-4 text-center">
            <Form.Label className="w-100 d-block text-center">Realice su pago aqui: </Form.Label>
                <img className="qr-imagen w-sm-50 w-md-25" src={imagen} width="267" height="265"/>
        </Form.Group>
    )
}


function FormArchivo({archivo, estado, cambiarEstado, acepta}){
 
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
                accept={acepta}
                onChange={onChange}
            />
        </Form.Group>
    )
}



function Boton({texto,manejarClic,enlace}){
    return(
        <button
            className='boton'
            onClick={manejarClic}>
            <Link to={enlace}>{texto}</Link>
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
//altura
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

let res5='w-100 xdx text-start alertaBien';
//imput del peso
function FormInputs5({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res5='w-100 xdx text-start ' 
        if(expresionRegular){   
            if(estado.campo<=150){
                if(expresionRegular.test(estado.campo)){
                    console.log("correcto")
                    res5='w-100  text-start alertaBien'+id
                    cambiarEstado({...estado,valido:'true'})
                } 
            }else{
                console.log("incorrecto")
                res5='w-100 text-start alertaMal'+id
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
                <Form.Label className={res5}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}

let res6='w-100 xdx text-start alertaBien';
function FormInputs6({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validarNombre = () => {
        res6='w-100 xdx text-start ' 
        if(expresionRegular){   
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
                res6='w-100  text-start alertaBien'+id
                cambiarEstado({...estado,valido:'true'})
            }else{
                console.log("incorrecto")
                res6='w-100 text-start alertaMal'+id
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
                <Form.Label className={res6}>{alerta}</Form.Label>                  
        </Form.Group>
    )
}

function FormFecha({label,value,estado, cambiarEstado}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    return(
        <Form.Group className="mb-4 d-block">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control className="form-control" type="datetime-local"
                value = {value}
                onChange={onChange}
            />
        </Form.Group>
    )
}

function FormFecha2({label,value,estado, cambiarEstado}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    const fCampo = new Date(estado.campo);
    
    console.log("FCampo: ",fCampo);


    const fechaActual = Date.now();
    
    const hoy= new Date (fechaActual);

    //console.log("hoy: "+hoy)
    const fechaCat=categoria.slice(0,-5);
    console.log("fechaCat: "+ fechaCat);

    let catEnMili= 1000*60*60*24*365*fechaCat;
    var fechaRest = fechaActual-catEnMili;
    

    let cincoAEnMili= 1000*60*60*24*365*5;

    var fechaCampoMili    = fCampo-0;

    var f1= new Date(fechaRest);
    var fn= new Date(fechaRest-cincoAEnMili);
    var f2= new Date(fechaCampoMili);

    const fMax= f1.toISOString();
    const fMax2= "1"+fMax.slice(1,-8);

    const fMin= fn.toISOString();
    const fMin2= "1"+fMin.slice(1,-8);
    
    console.log("MAXIMO" ,fMax2);
    console.log("minimo" ,fMin2)


    return(
        <Form.Group className="mb-4 d-block">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control className="form-control" type="datetime-local" max={fMax2} min={fMin2}
                onChange={onChange}
            />
        </Form.Group>
    )
}
var categoria= "";
function FormInputSinCambioEst({label, value}){
    categoria = value;
    return(
        <Form.Group className="mb-3 d-block">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control
                className="form-control"
                type="text"
                value={value}
            />
                <Form.Label></Form.Label>                  
        </Form.Group>
    )
}


function LabelForm({label}){
    return(
        <>
        <Form.Label className="w-100">{label}</Form.Label>
        </>
    );
}
function FormImagen({imagen}){ 
    return(
        <Form.Group className="mb-4 text-center">
            <Form.Label className="w-100 d-block text-center"></Form.Label>
                <img className="qr-imagen w-sm-50 w-md-25" src={imagen} width="267" height="265"/>
        </Form.Group>
    )
}

function FormPuntaje({label, placeholder, estado, cambiarEstado, expresionRegular, alerta,id}){
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

function FormFechaPartidos({label,estado, cambiarEstado,fMin,fMax}){
   
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    const fCampo = new Date(estado.campo);
    const fechaActual = Date.now();  
    const hoy= new Date (fechaActual);
    const fechaCat=categoria.slice(0,-5);

    let catEnMili= 1000*60*60*24*365*fechaCat;
    var fechaRest = fechaActual-catEnMili;
    

    let cincoAEnMili= 1000*60*60*24*365*5;

    var fechaCampoMili    = fCampo-0;

    var f1= new Date(fechaRest);
    var fn= new Date(fechaRest-cincoAEnMili);
    var f2= new Date(fechaCampoMili);
    //const fa= new Date(fMin);
    //const fb= new Date(fMax);
    const fM= f1.toISOString();   
    return(
        <Form.Group className="mb-4 d-block">
            <Form.Label className="w-100 text-start">{label}</Form.Label>
            <Form.Control className="form-control" type="datetime-local"value={estado.campo} max={fMax} min={fMin}
                onChange={onChange}
            />
        </Form.Group>
    )
}

function FormComboBoxEquipo1({label,arreglo, estado, cambiarEstado,actEquipo1}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
        //  console.log(e.target.value)
        actEquipo1(e.target.value);
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

function FormComboBoxEquipo2({label,arreglo, estado, cambiarEstado,actEquipo2}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
        //  console.log(e.target.value)
        actEquipo2(e.target.value);
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

function FormComboBoxPartidos({label,arreglo, estado, cambiarEstado,actualizar}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
        // console.log(e.target.value)
        actualizar(e.target.value);
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
    
export {FormInputs,FormInputs2,FormInputs3,FormInputs4,FormInputs5,FormInputs6, FormComboBox, FormQR, FormArchivo, Boton, FormContraseña,AleFinal,FormInputSinCambioEst, FormFecha,FormFecha2,LabelForm, FormImagen,FormPuntaje,FormFechaPartidos,FormComboBoxEquipo1,FormComboBoxEquipo2,FormComboBoxPartidos}

