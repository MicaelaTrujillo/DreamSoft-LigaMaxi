
import {FormInputSinCambioEst, Boton, LabelForm} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";


function FormInscripcion() {


    function onSubmit(){
        
    }

    return (
        <div className="row cont-main-form mt-2 mb-2 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">FORMULARIO DE INSCRIPCIÓN</h3>
                        <FormInputSinCambioEst
                            label="Nombre del equipo: "
                            value = "Jaguares"
                             
                        />
                        <FormInputSinCambioEst
                            label="Categoría: "
                            value = "35 años"
                             
                        />
                        <LabelForm
                            label="Añadir entrenador: "
                        />
                        <div className='botones pb-4'>
                            
                            <Boton 
                                type='submint'
                                texto='Añadir'      
                                manejarClic={cargarInscripcion}
                            />
                        </div>


                        <LabelForm
                                label="Añadir jugador: "
                            />
                        <div className='botones pb-4'>
                            
                            <Boton
                                    texto='Añadir'    
                                    manejarClic={""}
                                    enlace = "/FormularioRegistroJugador"
                            />
                        </div>

                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'/>
    
                            <Boton 
                                texto='Registrar'
                                />
                        </div>
                </Form>
        </div>
      );
}
export default FormInscripcion;