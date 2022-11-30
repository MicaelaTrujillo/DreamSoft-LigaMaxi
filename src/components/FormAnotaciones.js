import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';

import {Boton,FormInputs,FormInputs2,FormInputs3,FormInputs4,FormArchivo, FormContraseña,AleFinal,Alert,FormPuntaje, FormComboBox,LabelForm} from '../Elementos/ElementosForms';
import { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import { db } from "../Firebase/ConexionBD";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { UserContext } from '../context/userProvider';
import {app} from '../Firebase/ConexionBD';
import ReactDOM from 'react-dom/client';
function FormAnotaciones({equipoA, equipoB, partido}){

    const [equipo, cambiarEquipo] = useState({campo: "", valido: null});
    const [jugador, cambiarJugador] = useState({campo: "", valido: null});
    const [numAnotaciones, cambiarNumAnotaciones] = useState({campo: "", valido: null});

    const expresiones = {
        anotaciones: /^\d{1,2}$/, // Máximo 1 numeros.
    }
    
   // const equipoA = "Jaguares"
   // const equipoB = "Titanes"
cargarJugadores()
   /*useEffect(() => {
        //cambiarArregloJug({campo: jugadores})
        
    }, []);*/

    async function onSubmit(e){
        e.preventDefault();
      await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido, "Anotaciones", jugador.campo), {
        Equipo: equipo.campo,
        NumAnotaciones: numAnotaciones.campo
        })

        alert("Anotaciones del jugador registradas exitosamente.")
    }

    var jugadores = ["*Seleccione un jugador"]; 

    async function cargarJugadores(){
        const querySnapshot = await getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", equipo.campo, "Jugadores"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          jugadores.push(doc.data().nombreJugador)
          console.log(jugadores);
        });
        const root = ReactDOM.createRoot(
            document.getElementById('jugador')
          );
          const element = <FormComboBox
          label="Jugador: "
          arreglo = {jugadores}
          estado={jugador}
          cambiarEstado={cambiarJugador} 
          
      />;
          root.render(element);
    }

return(
<>
        <div id="contenedor" className="row cont-main-form mt-5 mb-5 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">ANOTACIONES</h3>
                        
                        <FormComboBox
                            label="Equipo: "
                            arreglo = {["*Seleccione el equipo",equipoA, equipoB]}
                            estado={equipo}
                            cambiarEstado={cambiarEquipo} 
                        />
                        <div id = "jugador">
                        <FormComboBox
                            label="Jugador: "
                            arreglo = {jugadores}
                            estado={jugador}
                            cambiarEstado={cambiarJugador} 
                        />
                        </div>
                        <FormPuntaje
                            label="Número de anotaciones del jugador: "
                            placeholder="Ingrese número de anotaciones"
                            estado={numAnotaciones}
                            cambiarEstado={cambiarNumAnotaciones} 
                            expresionRegular = {expresiones.anotaciones}
                            alerta="Las anotaciones solo contiene números"
                            id="1"
                        />

                       
                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'/>

                            <Boton 
                                texto='Guardar'
                                manejarClic={onSubmit}
                                />
                    </div>
                </Form>
        </div>
    
    </>
);

}

export default FormAnotaciones;