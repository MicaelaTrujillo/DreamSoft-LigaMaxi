
import {FormInputs, Boton, FormArchivo, FormFecha, FormImagen,FormInputSinCambioEst} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import { useState, useEffect } from 'react';

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as firebase from '../Firebase/ConexionBD'
import { render } from '@testing-library/react';


function FormCampeonato() {
    var fechaInicio = "";
    var fechaFin = "";
    var fechaIniConvocatoria = "";
    var limitePreInsc = "";
    var limiteInscrip = "";
    var nombreCampeonato = "";
    var versionCamp = "";
    var invitacion = "";
    var imagen1 = "";
    var imagen2 = "";
    var categ = "";


    var fechaInicio2 = "";
    var fechaFin2 = "";
    var fechaIniConvocatoria2 = "";
    var limitePreInsc2 = "";
    var limiteInscrip2 = "";
    const fechaActual = new Date();

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ0-9\s]{5,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
        version: /^[0-9\s]{1,40}$/,
        categoria: /^[0-9\s]{2}$/,
    }
    
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
    const [version, cambiarVersion] = useState({campo: "", valido: null});
    const [fecIni, cambiarFecIni] = useState({campo: "", valido: null});
    const [fecFin, cambiarFecFin] = useState({campo: "", valido: null});
    const [fecIniConvoc, cambiarfecIniConvoc] = useState({campo: "", valido: null});
    const [limPreInsc, cambiarLimPreInsc] = useState({campo: "", valido: null});
    const [limInsc, cambiarLimInsc] = useState({campo: "", valido: null});
    const [qr1, cambiarQR1] = useState({campo: ""});
    const [qr2, cambiarQR2] = useState({campo: ""});
    const [invitacionPub, cambiarInvitacionPub] = useState({campo: ""});
    const [categoria, cambiarCategoria] = useState({campo: "", valido: null});
    const [stringImage, setstringImage] = useState('');
  useEffect(() => {
    async function obtenerDatos() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("si entra al exist", docSnap.data());
          fechaInicio = docSnap.data().FechaInicio.toDate();
          fechaInicio = (fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth()+1 > 9? fechaInicio.getMonth()+1: "0" + (fechaInicio.getMonth()+1)) + "-" + (fechaInicio.getDate() > 9? fechaInicio.getDate(): "0" + fechaInicio.getDate())  +" 00:00").toString()
          //fechaInicio2 = docSnap.data().FechaInicio.toDate();
          fechaFin = docSnap.data().FechaFin.toDate();
          fechaFin = (fechaFin.getFullYear() + "-" + (fechaFin.getMonth()+1 > 9? fechaFin.getMonth()+1: "0" + (fechaFin.getMonth()+1)) + "-" + (fechaFin.getDate() > 9? fechaFin.getDate(): "0" + fechaFin.getDate()) +" 00:00").toString()
          //fechaFin2 = docSnap.data().FechaFin.toDate();
          fechaIniConvocatoria = docSnap.data().FechaIniConvocatoria.toDate();
          fechaIniConvocatoria = (fechaIniConvocatoria.getFullYear() + "-" + (fechaIniConvocatoria.getMonth()+1 > 9? fechaIniConvocatoria.getMonth()+1: "0" + fechaIniConvocatoria.getMonth()+1) + "-" + (fechaIniConvocatoria.getDate() > 9? fechaIniConvocatoria.getDate(): "0" + fechaIniConvocatoria.getDate()) +" 00:00").toString()
          //fechaIniConvocatoria2 = docSnap.data().FechaIniConvocatoria.toDate();
          limitePreInsc = docSnap.data().LimitePreInsc.toDate();
          limitePreInsc=(limitePreInsc.getFullYear() + "-" + (limitePreInsc.getMonth()+1 > 9? limitePreInsc.getMonth()+1: "0" + (limitePreInsc.getMonth()+1)) + "-" + (limitePreInsc.getDate() > 9? limitePreInsc.getDate(): "0" + limitePreInsc.getDate()) +" 00:00").toString()
          //limitePreInsc2 = docSnap.data().LimitePreInsc.toDate();
          limiteInscrip = docSnap.data().LimiteInscrip.toDate();
          limiteInscrip = (limiteInscrip.getFullYear() + "-" + (limiteInscrip.getMonth()+1 > 9? limiteInscrip.getMonth()+1: "0" + (limiteInscrip.getMonth()+1)) + "-" + (limiteInscrip.getDate() > 9? limiteInscrip.getDate(): "0" + limiteInscrip.getDate()) +" 00:00").toString()
         //limiteInscrip2 = docSnap.data().LimiteInscrip.toDate();
          nombreCampeonato = docSnap.data().NombreCampeonato;
          versionCamp = docSnap.data().Version;
          invitacion = docSnap.data().Invitacion;
          imagen1 = docSnap.data().qr1;
          imagen2 = docSnap.data().qr2;
          categ = docSnap.data().Categorias;
       console.log("cat", categ)
        categUnion = categ.toString() 
        console.log("separadito",categUnion.split(","))
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
       cambiarNombre({campo:nombreCampeonato})
       cambiarVersion({campo: versionCamp})
       cambiarFecIni({campo: fechaInicio})
       cambiarFecFin({campo:fechaFin})
       cambiarfecIniConvoc({campo:fechaIniConvocatoria})
       cambiarLimPreInsc({campo:limitePreInsc})
       cambiarLimInsc({campo:limiteInscrip})
       cambiarQR1({campo:imagen1})
       cambiarQR2({campo:imagen2})
       cambiarInvitacionPub({campo:invitacion})
       cambiarCategoria({campo:categUnion})
        /*var qrGenerado = "";
        if (fecha >= fechaIniConvocatoria && fecha <= limitePreInsc) {
          console.log("imagen1");
          qrGenerado = imagen1;
        } else {
          if (fecha > limitePreInsc && fecha <= limiteInscrip) {
            console.log("imagen2");
            qrGenerado = imagen2;
          } else {
            //AQUI SE CERRARIA FORMULARIO
          }
        }
        setstringImage(qrGenerado)
        console.log(stringImage, "este es el 2");*/
      }
      obtenerDatos()
      console.log(fechaInicio, fechaFin, fechaIniConvocatoria,limitePreInsc,limiteInscrip)
        console.log(nombreCampeonato,version,invitacion,imagen1,imagen2)
        console.log("nombre", nombre)
        console.log("preins", fecIni, fecFin, limPreInsc)
        

     
    }, []);
    
    async function onSubmit(e){
        e.preventDefault();
        console.log("validararar")
        validarFechas()
    }

    function validarFechas(){
        //categoria
        var arreglo = categoria.campo.split (",")
        console.log(arreglo) 
        //cambiarFecIni({campo:Date.parse(fecIni.campo)})
        fechaInicio2 = new Date(fecIni.campo)
        fechaFin2 = new Date(fecFin.campo)
        fechaIniConvocatoria2 = new Date(fecIniConvoc.campo)
        limitePreInsc2 = new Date(limPreInsc.campo)
        limiteInscrip2 = new Date(limInsc.campo)
       // var fechaFinalLimite = fechaInicio2
       // fechaFinalLimite = new Date(fechaFinalLimite.setDate(fechaFinalLimite.getDate() + 10))
        console.log(fechaIniConvocatoria2, limitePreInsc2, limiteInscrip2,fechaInicio2,fechaFin2)
            if(fechaIniConvocatoria2 > fechaActual && fechaIniConvocatoria2 < limitePreInsc2){
                if(limitePreInsc2 > fechaIniConvocatoria2){
                    if(limiteInscrip2 > limitePreInsc2){
                        if(fechaInicio2 > limiteInscrip2){
                            if(fechaFin2 > fechaInicio2){
                                updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf"), {
                                    NombreCampeonato: nombre.campo,
                                    Version: version.campo,
                                    FechaInicio: fechaInicio2,
                                    FechaFin: fechaFin2,
                                    FechaIniConvocatoria: fechaIniConvocatoria2,
                                    LimitePreInsc: limitePreInsc2,
                                    LimiteInscrip: limiteInscrip2,
                                    Categorias: arreglo
                                    });
                                    alert("Cambios guardados exitosamente.")
                            }else{
                                alert("Fecha de fin fuera de rango (debe ser mayor a la fecha inicio con una diferencia de máximo 10 días.)")
                            }
                        }else{
                            alert("Fecha de inicio fuera de rango (debe ser mayor a la fecha de límite de inscripción.)")
                        }
                    }else{
                        alert("Fecha de límite de inscripción fuera de rango (debe ser mayor a la fecha de límite de pre-inscripción.)")
                    }
                }else{
                    alert("Fecha de límite de pre-inscripción fuera de rango (debe ser mayor a la fecha de inicio de convocatoria.)")
                }
            }else{
                alert("Fecha de inicio de convocatoria fuera de rango (debe ser mayor a la fecha actual.)")
            }
            
    }

    async function uploadQR1(){
        const file = qr1.campo;
        const storage = getStorage();
        const storageRef = ref(storage,"Campeonato/" + file.name);
        console.log("el indefinido", file.name)
        if (file.name != undefined){
        uploadBytes(storageRef, file).then(snapshot => {
            console.log(snapshot,"hola")
          
         setTimeout(
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf"), {
                    qr1: url,
                    });
                    imagen1=url
                    cambiarQR1({campo:imagen1})
            }),5000)
        })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
            });
        }
    }

    async function uploadQR2(){
        const file = qr2.campo;
        const storage = getStorage();
        const storageRef = ref(storage,"Campeonato/" + file.name);
        console.log("el indefinido", file.name)
        if (file.name != undefined){
        uploadBytes(storageRef, file).then(snapshot => {
            console.log(snapshot,"hola")
          
         setTimeout(
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf"), {
                    qr2: url,
                    });
                    imagen2=url
                    cambiarQR2({campo:imagen2})
            }),5000)
        })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
            });
        }
    }
   
    async function uploadInvPub(){
        const file = invitacionPub.campo;
        const storage = getStorage();
        const storageRef = ref(storage,"Campeonato/" + file.name);
        console.log("el indefinido", file.name)
        if (file.name != undefined){
        uploadBytes(storageRef, file).then(snapshot => {
            console.log(snapshot,"hola")
          
         setTimeout(
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf"), {
                    Invitacion: url,
                    });
                    invitacion=url
                    cambiarInvitacionPub({campo:invitacion})
            }),5000)
        })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
            });
        }
    }
        uploadQR1()
        uploadQR2()
        uploadInvPub()
        var categUnion = ""
        /*const [categoria, cambiarCategoria] = useState({campo: "", valido: null});
        for(var i = 0; i < categ.length; i++){
            categUnion = categUnion + categ[i]
            console.log("union", categUnion)
           // cambiarCategoria({campo: categUnion})
        }*/
console.log(("30,40,50").split (","));
    return (
        <div className="row cont-main-form mt-5 mb-5 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">REGISTRO DE CAMPEONATO</h3>
                        <FormInputs
                            label="Nombre del campeonato: "
                            placeholder="Ingrese el nombre del campeonato"
                            estado={nombre}
                            cambiarEstado={cambiarNombre} 
                            expresionRegular = {expresiones.nombre}  
                            alerta="El nombre no debe contener caracteres especiales"
                            id="1"
                            value = {nombre.campo}
                             
                        />
                        <FormInputs
                            label="Versión: "
                            placeholder="Ingrese la versión del campeonato"
                            estado={version}
                            cambiarEstado={cambiarVersion} 
                            expresionRegular = {expresiones.version}  
                            alerta="Debe ingresar solo números"
                            id="1"
                            value = {version.campo}
                             
                        />

                        <FormInputs
                            label="Categoría: (Debe ingresar las categorías separadas por una coma. Ej: 30 años,40 años,50 años...) "
                            placeholder="Ej: 30 años,40 años,50 años"
                            estado={categoria}
                            cambiarEstado={cambiarCategoria} 
                            expresionRegular = {""}  
                            alerta="Debe ingresar solo números"
                            id="1"
                            value = {categoria.campo}
                             
                        />
                        <FormFecha
                            label="Fecha de inicio del campeonato: "
                            value = {fecIni.campo}
                            estado = {fecIni}
                            cambiarEstado = {cambiarFecIni}
                        />
                        <FormFecha
                            label="Fecha de fin del campeonato: "
                            value = {fecFin.campo}
                            estado = {fecFin}
                            cambiarEstado = {cambiarFecFin}
                        />
                        <FormFecha
                            label="Fecha inicio pre-inscripción: "
                            value = {fecIniConvoc.campo}
                            estado = {fecIniConvoc}
                            cambiarEstado = {cambiarfecIniConvoc}
                        />
                        <FormFecha
                            label="Fecha límite de pre-inscripción: "
                            value= {limPreInsc.campo}
                            estado = {limPreInsc}
                            cambiarEstado = {cambiarLimPreInsc}
                        />
                        <FormArchivo
                            archivo="Monto de pre-inscripción (QR 1): "
                            estado={qr1}
                            cambiarEstado={cambiarQR1}
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {qr1.campo}
                        />
                         <FormFecha
                            label="Fecha límite de inscripción: "
                            value = {limInsc.campo}
                            estado = {limInsc}
                            cambiarEstado = {cambiarLimInsc}
                         />
                        <FormArchivo
                            archivo="Monto de inscripción (QR 2): "
                            estado={qr2}
                            cambiarEstado={cambiarQR2}
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {qr2.campo}
                        />
                        <FormArchivo
                            archivo="Invitación pública: "
                            estado={invitacionPub}
                            cambiarEstado={cambiarInvitacionPub}
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {invitacionPub.campo}
                        />
                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'
                                manejarClic={""}
                                enlace="/"
                                />
    
                            <Boton 
                                texto='Guardar'
                                manejarClic={onSubmit}
                                enlace="/"
                                />
                    </div>
                </Form>
        </div>
      );
}
export default FormCampeonato;