
import {FormInputs, FormComboBox, FormQR, Boton, FormArchivo} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import "../styles sheet/FormPreinscripcion.css";
import { useState } from 'react';
import css from "../styles sheet/FormPreinscripcion.css"

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



function FormPreinsc() {
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
    const [categoria, cambiarCategoria] = useState({campo: "", valido: null});
    const [comprobante, cambiarComprobante] = useState();
   
    const expresiones = {
        nombreEquipo: /^[a-zA-ZÀ-ÿ0-9\s]{3,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
    }

    /*const manejarEnvio = async() => {
        console.log("clic");
        await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", "prueba03"), {
            NombreEquipo: "Los Angeles",
            Categoria: "45 años",
            });
      }*/
      
    async function onSubmit(e){
        e.preventDefault();
        // Add a new document in collection "cities"
        await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", "prueba05"), {
        NombreEquipo: nombre.campo,
        Categoria: categoria.campo,
        });
        console.log("esaqui", comprobante)
        uploadFile(comprobante);
    }
    function uploadFile(file){
        const storageRef = ref(getStorage, 'Comprobantes/some-child')
        console.log("llega")
            uploadBytes(storageRef, file).then(snapshot => {
            console.log(snapshot,"hola")
            })
    }
    
    function subirArchivo() {
        var comprob= "";
        var nombreComp="";
        const onChange = (e) => {
            //cambiarEstado({...estado, campo: e.target.files[0]});
            comprob= e.target.files[0];
            nombreComp = e.target.value;
            nombreComp = nombreComp.slice(12);
            console.log(comprob)
            uploadFile(comprob);
       
        }
     }

    return (
    <>
    <div className="row cont-main-form mt-5 mb-5 mx-0">
        <Form className="form text-center container col-8 ">
            <h3 className="mb-5 mt-3">FORMULARIO DE PRE-INSCRIPCION</h3>
                <FormInputs
                    label="Nombre de equipo: "
                    placeholder="Ingrese el nombre del equipo"
                    estado={nombre}
                    cambiarEstado={cambiarNombre} 
                    expresionRegular = {expresiones.nombreEquipo}
                />
                <FormComboBox
                    label="Categoría: "
                    arreglo = {["30 años", "35 años", "40 años"]}
                    estado={categoria}
                    cambiarEstado={cambiarCategoria} 
                />
                <FormQR/>
                <FormArchivo
                    archivo="Subir comprobante:"
                    estado={comprobante}
                    cambiarEstado={cambiarComprobante}
                />
                <div className='botones pb-4'>
                    <Boton 
                        texto='Cancelar'/>

                    <Boton 
                        texto='Enviar'
                        manejarClic={onSubmit}
                        />
            </div>
        </Form>
    </div>
    </>
  );
}

export default FormPreinsc;