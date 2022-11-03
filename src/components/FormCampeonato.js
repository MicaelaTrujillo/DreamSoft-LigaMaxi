
import {FormInputs, Boton, FormArchivo, FormFecha, FormImagen} from '../Elementos/ElementosForms'
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

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ0-9\s]{5,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
        version: /^[0-9\s]{1,40}$/,
    }
    
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
    const [version, cambiarVersion] = useState({campo: "", valido: null});
    const [fecIni, cambiarFecIni] = useState({campo: "", valido: null});
    const [fecFin, cambiarFecFin] = useState({campo: "", valido: null});
    const [fecIniConvoc, cambiarfecIniConvoc] = useState({campo: "", valido: null});
    const [limPreInsc, cambiarLimPreInsc] = useState({campo: "", valido: null});
    const [limInsc, cambiarLimInsc] = useState({campo: "", valido: null});
    const [qr1, cambiarQR1] = useState("");
    const [qr2, cambiarQR2] = useState("");
    const [invitacionPub, cambiarInvitacionPub] = useState("");

    const [stringImage, setstringImage] = useState('');
  useEffect(() => {
    async function obtenerDatos() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("si entra al exist", docSnap.data());
          fechaInicio = docSnap.data().FechaInicio.toDate();
          fechaInicio = (fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth() > 9? fechaInicio.getMonth(): "0" + fechaInicio.getMonth()) + "-" + (fechaInicio.getDate() > 9? fechaInicio.getDate(): "0" + fechaInicio.getDate()) +" 00:00").toString()
          fechaFin = docSnap.data().FechaFin.toDate();
          fechaFin = (fechaFin.getFullYear() + "-" + (fechaFin.getMonth() > 9? fechaFin.getMonth(): "0" + fechaFin.getMonth()) + "-" + (fechaFin.getDate() > 9? fechaFin.getDate(): "0" + fechaFin.getDate()) +" 00:00").toString()
          fechaIniConvocatoria = docSnap.data().FechaIniConvocatoria.toDate();
          fechaIniConvocatoria = (fechaIniConvocatoria.getFullYear() + "-" + (fechaIniConvocatoria.getMonth() > 9? fechaIniConvocatoria.getMonth(): "0" + fechaIniConvocatoria.getMonth()) + "-" + (fechaIniConvocatoria.getDate() > 9? fechaIniConvocatoria.getDate(): "0" + fechaIniConvocatoria.getDate()) +" 00:00").toString()
          limitePreInsc = docSnap.data().LimitePreInsc.toDate();
          limitePreInsc=(limitePreInsc.getFullYear() + "-" + (limitePreInsc.getMonth() > 9? limitePreInsc.getMonth(): "0" + limitePreInsc.getMonth()) + "-" + (limitePreInsc.getDate() > 9? limitePreInsc.getDate(): "0" + limitePreInsc.getDate()) +" 00:00").toString()
          limiteInscrip = docSnap.data().LimiteInscrip.toDate();
          limiteInscrip = (limiteInscrip.getFullYear() + "-" + (limiteInscrip.getMonth() > 9? limiteInscrip.getMonth(): "0" + limiteInscrip.getMonth()) + "-" + (limiteInscrip.getDate() > 9? limiteInscrip.getDate(): "0" + limiteInscrip.getDate()) +" 00:00").toString()
          nombreCampeonato = docSnap.data().NombreCampeonato;
          versionCamp = docSnap.data().Version;
          invitacion = docSnap.data().Invitacion;
          imagen1 = docSnap.data().qr1;
          imagen2 = docSnap.data().qr2;
       
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
       cambiarQR1(imagen1)
       cambiarQR2(imagen2)
       cambiarInvitacionPub(invitacion)
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
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {qr1}
                        />
                         <FormFecha
                            label="Fecha límite de inscripción: "
                            value = {limInsc.campo}
                            estado = {limInsc}
                            cambiarEstado = {cambiarLimInsc}
                         />
                        <FormArchivo
                            archivo="Monto de inscripción (QR 2): "
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {qr2}
                        />
                        <FormArchivo
                            archivo="Invitación pública: "
                            acepta="image/*"
                        />
                        <FormImagen
                            imagen = {invitacionPub}
                        />
                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'/>
    
                            <Boton 
                                texto='Guardar'
                                />
                    </div>
                </Form>
        </div>
      );
}
export default FormCampeonato;