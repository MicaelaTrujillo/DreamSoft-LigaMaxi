
import {FormInputs, FormComboBox, FormQR, Boton, FormArchivo} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import "../styles sheet/FormPreinscripcion.css";
import { useState } from 'react';
import css from "../styles sheet/FormPreinscripcion.css"


import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function FormPreinsc() {
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
    const [categoria, cambiarCategoria] = useState({campo: "", valido: null});
    const [comprobante, cambiarComprobante] = useState({campo: "", valido: null});
   
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
        //setTimeout(repetido,5000);
        console.log(nombre.campo);
        repetido();
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
        
        for (var j=0; j < titulos.length; j++) {
            console.log(titulo,titulos[j], j, titulos.length)
            console.log("Cat",categoria.campo)
             if (titulo.toLowerCase() == titulos[j].toLowerCase()) {
                 
                 controlar = false;
                 j = titulos.length + 1;
                 alert("El equipo ya está registrado en la base de datos.")
             }
             
             
     
         }
         console.log(controlar)
         if(controlar){
            uploadFile(comprobante.campo);
              await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", nombre.campo), {
                 NombreEquipo: nombre.campo,
                 Categoria: categoria.campo,
                 //UrlImagen: urlImagen
                 });
                 cambiarNombre({campo:'',valido:null});
                 cambiarCategoria({campo:'',valido:null});
                 alert("Registro exitoso");
          }
    }
    var controlar = true;
    var titulos = []; 
    async function repetido(){
       
        const querySnapshot = await getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Solicitudes"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          titulos.push(doc.data().NombreEquipo)
          console.log(titulos);
        });
        testTitulo();
    }

    let urlImagen="hola"
    function uploadFile(file){
       
        const storage = getStorage();
        const storageRef = ref(storage,"Comprobantes/" + file.name);
        
            uploadBytes(storageRef, file).then(snapshot => {
            //console.log(snapshot,"hola")
            })

            const starsRef = ref(storage,"Comprobantes/" + file.name);
            getDownloadURL(starsRef)
            .then((url) => {
                console.log(url)
                urlImagen=url;
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


    /*function subirArchivo() {
        var comprob= "";
        var nombreComp="";
       
            //cambiarEstado({...estado, campo: e.target.files[0]});
            comprob= comprobante.campo;
            //console.log(comprob)
            nombreComp = comprobante.valor;
            //nombreComp = nombreComp.slice(12);
            //console.log(comprob)
            uploadFile(comprob);
       
     }*/
/*
     var qrGenerado = "";
     async function generarQR(){
        var fechaIniConvocatoria= ""
        var limitePreInsc= ""
        var limiteInscrip= ""
        const fecha = +new Date();
        console.log("actual",fecha);

        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            fechaIniConvocatoria= docSnap.data().FechaIniConvocatoria;
            limitePreInsc= docSnap.data().LimitePreInsc;
            limiteInscrip= docSnap.data().LimitePreInscrip;
            console.log(fechaIniConvocatoria,limitePreInsc,limiteInscrip)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
        //Generamos qr
        if(fecha >= fechaIniConvocatoria && fecha <= limitePreInsc){
            qrGenerado = "/assets/qr.jpeg";
        }else{
            if(fecha > limitePreInsc && fecha <= limiteInscrip){
                qrGenerado = "/assets/qrWebsis.png";
            }else{
                //AQUI SE CERRARIA FORMULARIO
            }
        }
     }
     generarQR();*/
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
                        arreglo = {["Seleccione categoría","30 años", "35 años", "40 años"]}
                        estado={categoria}
                        cambiarEstado={cambiarCategoria} 
                    />
                    <FormQR
                      //  QR={qrGenerado}
                    />
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