import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';

import {Boton,FormInputs,FormInputs2,FormInputs3,FormInputs4,FormArchivo, FormContraseña,AleFinal,Alert,FormPuntaje, FormComboBox,LabelForm} from '../Elementos/ElementosForms';
import { useContext, useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc, updateDoc ,getDocs,  collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { UserContext } from '../context/userProvider';
import {app} from '../Firebase/ConexionBD';

function FormPlanilla({id, equipo1, equipo2}){
    
    const [puntosA, cambiarPuntosA] = useState({campo: "", valido: null});
    const [puntosB, cambiarPuntosB] = useState({campo: "", valido: null});
    const [ganador, cambiarGanador] = useState({campo: "", valido: null});
    const [perdedor, cambiarPerdedor] = useState({campo: "", valido: null});
    const expresiones = {
        puntaje: /^\d{2,3}$/, // Máximo 3 numeros.
    }
    
    const equipoA = equipo1
    const equipoB = equipo2
    const partido = id

    var enlaceForm = "/"
    async function onSubmit(e){
        e.preventDefault();
      await updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido), {
            EquipoGanador: ganador.campo,
            EquipoPerdedor: perdedor.campo,
            PuntajeGanador: puntosA.campo,
            PuntajePerdedor: puntosB.campo
        })

        alert("Resultados del partido registrado exitosamente.")
    }

    var enlaceForm1=""
    enlaceForm1 = "/FormularioFaltas/" + equipoA + "/" + equipoB + "/" + partido

    async function onSubmit1(e){
        e.preventDefault();
        console.log(equipoA, equipoB, partido);
          /*  await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido), {
                NombreEquipo: nombre,
                Categoria: categoria,
                //Entrenador: nombreEnt.campo
                })*/
    }

    var enlaceForm2=""
    enlaceForm2 = "/FormularioAnotaciones/" + equipoA + "/" + equipoB + "/" + partido

    function onSubmit2(e){
        e.preventDefault();
        console.log(equipoA, equipoB, partido);
    }

    const [faltas, setFaltas] = useState([]);
    const [anotaciones, setAnotaciones] = useState([]);
    useEffect(() => {
        
        getDocs(collection(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido, "Faltas")).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("datoos",datos,datos.length);  
                setFaltas(datos);
        });

        getDocs(collection(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido, "Anotaciones")).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("datoos",datos,datos.length);  
                setAnotaciones(datos);
        });
    }, []);

return(
<>
        <div id="contenedor" className="row cont-main-form mt-5 mb-5 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">REGISTRO PUNTAJE DEL PARTIDO</h3>
                        
                        <FormComboBox
                            label="Equipo ganador: "
                            arreglo = {["*Seleccione el equipo",equipoA, equipoB]}
                            estado={ganador}
                            cambiarEstado={cambiarGanador} 
                        />
                        <FormPuntaje
                            label="Puntaje equipo ganador: "
                            placeholder="Ingrese el puntaje del equipo"
                            estado={puntosA}
                            cambiarEstado={cambiarPuntosA} 
                            expresionRegular = {expresiones.puntaje}
                            alerta="El puntaje solo contiene números"
                            id="1"
                        />
                        <FormComboBox
                            label="Equipo perdedor: "
                            arreglo = {["*Seleccione el equipo",equipoA, equipoB]}
                            estado={perdedor}
                            cambiarEstado={cambiarPerdedor} 
                        />
                        <FormPuntaje
                            label="Puntaje equipo perdedor: "
                            placeholder="Ingrese el puntaje del equipo"
                            estado={puntosB}
                            cambiarEstado={cambiarPuntosB} 
                            expresionRegular = {expresiones.puntaje}
                            alerta="El puntaje solo contiene números"
                            id="1"
                        />

                        <div className='m-4 mt-0 negrita'>FALTAS
                        <div className="contenedor-subtitulos my-2">
                            <span className="alineacion negrita">Jugador</span>
                            <span className="alineacion negrita">Equipo</span>
                            <span className="alineacion negrita">Faltas</span>
                        </div>
                            {
                                faltas.map((falta) => (
                                <div className="contenedor-tarjetaFalta my-2">
                                    <span className="alineacion">{falta.id}</span>
                                    <span className="alineacion">{falta.Equipo}</span>
                                    <span className="alineacion">{falta.NumFaltas}</span>
                                </div>
                                ))
                                            
                            } 
                        </div>

                        <LabelForm
                                label="Añadir falta: "
                            />
                        <div className='botones pb-4 mb-4'>
                            
                            <Boton
                                    texto='Añadir falta'    
                                    manejarClic={onSubmit1}
                                    enlace = {enlaceForm1}
                            />
                        </div>

                        <div className='m-4 mt-0 negrita'>ANOTACIONES
                        <div className="contenedor-subtitulos my-2">
                            <span className="alineacion negrita">Jugador</span>
                            <span className="alineacion negrita">Equipo</span>
                            <span className="alineacion negrita">Faltas</span>
                        </div>
                            {
                                anotaciones.map((anotacion) => (
                                <div className="contenedor-tarjetaFalta my-2">
                                    <span className="alineacion">{anotacion.id}</span>
                                    <span className="alineacion">{anotacion.Equipo}</span>
                                    <span className="alineacion">{anotacion.NumAnotaciones}</span>
                                </div>
                                ))
                                            
                            } 
                        </div>

                        <LabelForm
                                label="Añadir anotación: "
                            />
                        <div className='botones pb-4 mb-4'>
                            
                            <Boton
                                    texto='Añadir anotación'    
                                    manejarClic={onSubmit2}
                                    enlace = {enlaceForm2}
                            />
                        </div>
                       
                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'/>

                            <Boton 
                                texto='Guardar'
                                manejarClic={onSubmit}
                                enlace={enlaceForm}
                                />
                    </div>
                </Form>
        </div>
    
    </>
);

}

export default FormPlanilla;