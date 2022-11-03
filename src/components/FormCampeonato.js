
import {FormInputs, Boton, FormArchivo, FormFecha} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";


function FormCampeonato() {
    return (
        <div className="row cont-main-form mt-5 mb-5 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">REGISTRO DE CAMPEONATO</h3>
                        <FormInputs
                            estado={""}
                            cambiarEstado={""} 
                            expresionRegular = {""}  
                            label="Nombre del campeonato: "
                            placeholder="Ingrese el nombre del campeonato"
                            value = "jaguares"
                             
                        />
                        <FormFecha
                            label="Fecha de inicio del campeonato: "
                        />
                        <FormFecha
                            label="Fecha de fin del campeonato: "
                        />
                        <FormFecha
                            label="Fecha límite de pre-inscripción: "
                        />
                        <FormArchivo
                            archivo="QR 1: "
                            acepta="image/*"
                        />
                         <FormFecha
                            label="Fecha límite de inscripción: "
                         />
                        <FormArchivo
                            archivo="QR 2: "
                            acepta="image/*"
                        />
                        <FormArchivo
                            archivo="Invitación pública: "
                            acepta="image/*"
                        />
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
export default FormCampeonato;