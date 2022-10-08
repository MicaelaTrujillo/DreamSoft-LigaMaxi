import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';
import {Boton,FormInputs,FormArchivo, FormContraseña} from '../Elementos/ElementosForms';
import { useState } from 'react';


function FormRegistro() {

  const [nombre, cambiarNombre] = useState({campo: "", valido: null});
   
  const expresiones = {
      nombreJugador: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
  }

const manejarClic = () => {
  console.log("clic");
}

  return (
    <div className="App">
      <div className='container'>
        <div className='formulario'> 
          <h1>REGISTRO DE DELEGADO</h1>

            <FormInputs
                    estado={nombre}
                    cambiarEstado={cambiarNombre} 
                    expresionRegular = {expresiones.nombreJugador}   
                    label="Nombres(s) y Apellidos(s):"
                    placeholder="Juan Perez"
                />

            
            <FormInputs
                    estado={'nombre'}
                    cambiarEstado={'cambiarNombre'} 
                    expresionRegular = {'expresiones.nombreEquipo'}   
                    label="Correo:"
                    placeholder="name@example.com"
                />

            <FormInputs
                    estado={'nombre'}
                    cambiarEstado={'cambiarNombre'} 
                    expresionRegular = {'expresiones.nombreEquipo'}   
                    label="Telefono:"
                    placeholder="+591 70707070"
                />


            <FormContraseña
                    label="Contraseña:"
                    placeholder="123456"
                />

            <FormArchivo
              archivo="Foto:"
            />

            <div className='botones'>
              <Boton 
                texto='Cancelar'
                manejarClic={manejarClic}/>

              <Boton
                texto='Registrar'
                manejarClic={manejarClic}/>
            </div>
        </div>
      </div>
    
    </div>
  );
}

export default FormRegistro;
