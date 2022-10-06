
import {FormInputs, FormComboBox, FormQR, FormComprob, FormBoton} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import "../styles sheet/FormPreinscripcion.css";
import { useState } from 'react';

function FormPreinsc() {
    const [nombre, cambiarNombre] = useState({campo: "", valido: null});
   
    const expresiones = {
        nombreEquipo: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
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
                <FormComprob/>
                <div className="d-flex justify-content-evenly">
                    <FormBoton
                        value="Cancelar"
                    />
                    <FormBoton
                        value="Enviar" 
                    />
                </div>
        </Form>
    </div>
    </>
  );
}

export default FormPreinsc;