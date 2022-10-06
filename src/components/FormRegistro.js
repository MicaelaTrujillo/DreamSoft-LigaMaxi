import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';
import {Boton,Inputext,FormInputs} from './Inputext';
function FormRegistro() {

const manejarClic = () => {
  console.log("clic");
}

  return (
    <div className="App">
      <div className='container'>
        <div className='formulario'> 
          <h1>REGISTRO DE DELEGADO</h1>
            <div class="mb-3">
              <label for="nombreyapellido" class="form-label">Nombres(s) y Apellidos(s):</label>

              <Inputext
                texto="Juan Perez"/>
            </div>

            <FormInputs
                    estado={'nombre'}
                    cambiarEstado={'cambiarNombre'} 
                    expresionRegular = {'expresiones.nombreEquipo'}   
                    label="Apellido:"
                    placeholder="Ingrese su apellido"
                />

            <div class="mb-3">
              <label for="correo" class="form-label">Correo:</label>
              <Inputext
                texto="name@example.com"/>
            </div>
            

            <div class="mb-3">
              <label for="telefono" class="form-label">Telefono:</label>  
              <Inputext
                texto="+591 70707070"/>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <Inputext
                texto="123456"/>
            </div>

            <div class="mb-3">
              <label for="formFile" class="form-label">Foto:</label>
              <input class="form-control" type="file" id="formFile"/>
              
            </div>

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
