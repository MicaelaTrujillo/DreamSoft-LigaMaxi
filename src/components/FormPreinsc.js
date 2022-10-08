
import {FormInputs, FormComboBox, FormQR, Boton, FormArchivo} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import "../styles sheet/FormPreinscripcion.css";
import { useState } from 'react';


function FormPreinsc() {
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
   
    const expresiones = {
        nombreEquipo: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
    }

    const manejarClic = () => {
        console.log("clic");
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
                    arreglo = {["30 años", "35 años", "40 años"]}
                />
                <FormQR/>
                <FormArchivo
                    archivo="Subir comprobante:"
                />
                <div className='botones pb-4'>
                    <Boton 
                        texto='Cancelar'
                        manejarClic={manejarClic}/>

                    <Boton
                        texto='Enviar'
                        manejarClic={manejarClic}/>
            </div>
        </Form>
    </div>
    </>
  );
}

export default FormPreinsc;