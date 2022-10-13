
import {FormInputs, FormComboBox, FormQR, Boton, FormArchivo} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import "../styles sheet/FormPreinscripcion.css";
import { useState } from 'react';
import css from "../styles sheet/FormPreinscripcion.css"

import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection} from "firebase/firestore";


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
        setTimeout(repetido,5000);
        console.log("rep",controlar)
        /*if(controlar === true){
            // Add a new document in collection "cities"
            await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", nombre.campo), {
            NombreEquipo: nombre.campo,
            Categoria: categoria.campo,
            });
            //console.log("esaqui", comprobante)
            //uploadFile(comprobante);
        }else{
            console.log("hay repetidos")
        }*/
    }



    async function testTitulo() {
    
        //document.getElementById("botonReg").disabled = true;
        var titulo = nombre.campo;
        //Reemplazamos los saltos de linea por espacios
        titulo = titulo.replace (/\r?\n/g," ");
        //Reemplazamos los espacios seguidos por uno solo
        titulo = titulo.replace (/[ ]+/g," ");
        //Quitarmos los espacios del principio y del final
        titulo = titulo.replace (/^ /,"");
        titulo = titulo.replace (/ $/,"");
        //comas
        titulo = titulo.replace (/,,+/g,",");
        
        for (let j=0; j < titulos.length; j++) {
            console.log(titulo,titulos[j])
             if (titulo.toLowerCase() == titulos[j].toLowerCase()) {
                 
                 controlar = false;
                 console.log("test", controlar)
                 alert("El equipo ya está registrado en la base de datos.")
                 j = titulos.length + 1;
             }else{
                await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", nombre.campo), {
                    NombreEquipo: nombre.campo,
                    Categoria: categoria.campo,
                    });
             }
     
         }
    }
    var controlar = true;
    var titulos = []; 
    async function repetido(){
       
        const querySnapshot = await getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          titulos.push(doc.data().NombreEquipo)
          console.log(titulos)
          testTitulo();
        });
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
                        alerta="El nombre del equipo no debe contener caracteres especiales"
                        id="1"
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