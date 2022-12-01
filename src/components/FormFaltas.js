import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';

import {Boton,FormInputs,FormInputs2,FormInputs3,FormInputs4,FormArchivo, FormContraseña,AleFinal,Alert,FormPuntaje, FormComboBox,LabelForm} from '../Elementos/ElementosForms';
import { useContext, useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { UserContext } from '../context/userProvider';
import {app} from '../Firebase/ConexionBD';
import ReactDOM from 'react-dom/client';
function FormFaltas({equipoA, equipoB, partido}){
    const enlaceForm = '/FormularioPlanilla'
    const [equipo, cambiarEquipo] = useState({campo: "", valido: null});
    const [jugador, cambiarJugador] = useState({campo: "", valido: null});
    const [numFaltas, cambiarNumFaltas] = useState({campo: "", valido: null});
    //const [arregloJug, cambiarArregloJug] = useState({campo:[], valido: null});

    const expresiones = {
        faltas: /^\d{1}$/, // Máximo 1 numeros.
    }
    
    //const equipoA = "Jaguares"
   // const equipoB = "Titanes"
   cargarJugadores()
   /*useEffect(() => {
        //cambiarArregloJug({campo: jugadores})
        
    }, []);*/
    var faltas = 0;
    async function onSubmit(e){
        e.preventDefault();
        
      await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido, "Faltas", jugador.campo), {
        Equipo: equipo.campo,
        NumFaltas: numFaltas.campo
        })
        alert("Faltas del jugador registradas exitosamente.")

        console.log("recuperar", equipo.campo, jugador.campo)
        const docRef = doc(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", equipo.campo, "Jugadores", jugador.campo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            faltas = parseInt(docSnap.data().NumFaltas) + parseInt(numFaltas.campo)
            await updateDoc(docRef, {
                NumFaltas: faltas
                })
                console.log("existe")
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
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
                    <h3 className="mb-5 mt-3">FALTAS</h3>
                        
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
                            label="Número de faltas del jugador: "
                            placeholder="Ingrese número de faltas"
                            estado={numFaltas}
                            cambiarEstado={cambiarNumFaltas} 
                            expresionRegular = {expresiones.faltas}
                            alerta="Las faltas solo contiene números"
                            id="1"
                        />

                       
                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'/>

                            <Boton 
                                texto='Guardar'
                                manejarClic={onSubmit}
                                enlace = {enlaceForm}
                                />
                    </div>
                </Form>
        </div>
    
    </>
);

}

export default FormFaltas;