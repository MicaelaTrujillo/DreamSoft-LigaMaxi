
import {FormInputs, FormInputSinCambioEst, Boton, LabelForm} from '../Elementos/ElementosForms'
import Form from "react-bootstrap/Form";
import { useState, useEffect } from 'react';
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";


function FormInscripcion({nombre, categoria}) {
       
   // var contador = 0
    const [contador, cambiarcontador] = useState("")
    const [nombreEnt, cambiarNombreEnt] = useState({campo: "", valido: null});

    const expresiones = {
        nombreEnt: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    }

var enlaceForm=""
    console.log("ya llego al limite",contador)
    if(contador == 12){
        enlaceForm = "/Inscripciones/FormularioInscripcion/"+ nombre + "/" + categoria
    }else{
        enlaceForm = '/FormularioRegistroJugador/'+ nombre + "/" + categoria
}
    //const [enlaceForm, cambiarenlaceForm] = useState('/FormularioRegistroJugador/'+ nombre + "/" + categoria)
    
    async function onSubmit1(e){
        e.preventDefault();
        if(contador == 12){
            alert("Alcanzó el límite de jugadores por equipo.")
        }
        console.log(nombreEnt.campo, nombre);
            await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombre), {
                NombreEquipo: nombre,
                Categoria: categoria,
                //Entrenador: nombreEnt.campo
                })
    }
    var enlaceFom2 =""
    if(contador < 5){
        enlaceFom2 = "/Inscripciones/FormularioInscripcion/"+ nombre + "/" + categoria
    }else{
        enlaceFom2 = "/Inscripciones"
}
    async function onSubmit2(e){
        e.preventDefault();
        console.log("onsubmit2")
        if(contador < 5){
            alert("Debe registrar al menos a 5 jugadores.")
        }else{
            await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombre), {
                NombreEquipo: nombre,
                Categoria: categoria,
                Entrenador: nombreEnt.campo
            })
            await updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Solicitudes", nombre), {
                Inscrito: true
            })
                alert("Se añadio el equipo a la base de datos.")
            }
    }
    const [jugadores, setJugadores] = useState([]);
    useEffect(() => {
        
        getDocs(collection(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombre, "Jugadores")).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("datoos",datos,datos.length);  
                setJugadores(datos);
                cambiarcontador(datos.length)
        });
        /*
        const jugMap = ReactDOM.createRoot(
            document.getElementById('jugadores')
          );
          const element = <div>
            {
                jugadores.map((jugador) => (
                <div className="contenedor-tarjeta">
                    <img src={jugador.Foto} width="50" height="50"/>
                    <span className="nom-tarjeta">{jugador.nombreJugador}</span>
                </div>
                ))
                            
            }
          </div>;
          
          jugMap.render(element);*/
    }, []);

    return (
        <div className="row cont-main-form mt-2 mb-2 mx-0">
            
                <Form className="form text-center container col-8 ">
                    <h3 className="mb-5 mt-3">FORMULARIO DE INSCRIPCIÓN</h3>
                        <FormInputSinCambioEst
                            label="Nombre del equipo: "
                            value = {nombre}
                        />
                        <FormInputSinCambioEst
                            label="Categoría: "
                            value = {categoria}
                             
                        />

                        <div className='m-4 mt-0'>JUGADORES
                            {
                                jugadores.map((jugador) => (
                                <div className="contenedor-tarjetaJugador">
                                    <img src={jugador.Foto} width="45" height="45" className='text-start'/>
                                    <span className="nom-tarjeta">{jugador.nombreJugador}</span>
                                </div>
                                ))
                                            
                            } 
                        </div>

                        <LabelForm
                                label="Añadir jugador: "
                            />
                        <div className='botones pb-4'>
                            
                            <Boton
                                    texto='Añadir'    
                                    manejarClic={onSubmit1}
                                    enlace = {enlaceForm}
                            />
                        </div>
                        <FormInputs
                            label="Entrenador: "
                            placeholder="Ingrese el nombre del entrenador"
                            estado={nombreEnt}
                            cambiarEstado={cambiarNombreEnt} 
                            expresionRegular = {expresiones.nombreEnt}
                            alerta="Solo se aceptan caracteres alfabéticos, nombre con mas de 3 caracteres"
                            id="1"
                        />

                        <div className='botones pb-4'>
                            <Boton 
                                texto='Cancelar'
                                manejarClic=""
                                enlace = {enlaceFom2}
                                />
                                
    
                            <Boton 
                                texto='Registrar'
                                manejarClic={onSubmit2}
                                enlace = {enlaceFom2}
                                />
                        </div>
                </Form>
        </div>
      );
}
export default FormInscripcion;