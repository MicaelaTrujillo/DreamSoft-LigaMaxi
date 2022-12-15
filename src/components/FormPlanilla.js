import '../styles sheet/formRegistro.css';
import '../styles sheet/Boton.css';

import {Boton,FormPuntaje, LabelForm,FormInputSinCambioEst} from '../Elementos/ElementosForms';
import { useContext, useState,useEffect } from 'react';
import {Form, Table} from "react-bootstrap";
import { db } from "../Firebase/ConexionBD";
import { doc, updateDoc ,getDocs,  collection, getDoc} from "firebase/firestore";


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
    var enlaceForm3= "/PlanillaPartidos"
    var finalPartidoG = ""
    var finalPartidoP = ""


    var PG1 = 0
    var PP1 = 0
    var PE1 = 0
    var puntosAF1 = 0
    var puntosEC1 = 0

    var PG2 = 0
    var PP2 = 0
    var PE2 = 0
    var puntosAF2 = 0
    var puntosEC2 = 0

    var pGan = 0
    var pPer=0
    async function onSubmit(e){
        e.preventDefault();
        console.log("puntos", puntosA,puntosB)
        if(puntosA.campo > puntosB.campo){
            console.log("es mayor")
            finalPartidoG = equipoA
            finalPartidoP = equipoB
            pGan = puntosA.campo
            pPer = puntosB.campo
            cambiarGanador({campo: equipoA})
            cambiarPerdedor({campo: equipoB})
            console.log(ganador.campo,perdedor.campo)

        }else{
            if(puntosA.campo < puntosB.campo){
                finalPartidoG = equipoB
            finalPartidoP = equipoA
            pGan = puntosB.campo
            pPer = puntosA.campo
                cambiarGanador({campo: equipoB})
                cambiarPerdedor({campo: equipoA})
            }else{
                finalPartidoG = equipoA
            finalPartidoP = equipoA
              
            }
        }
console.log(finalPartidoG, finalPartidoP)
        if(finalPartidoG == finalPartidoP){
            console.log(ganador.campo,perdedor.campo)
            const docRef = doc(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", equipoA);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            PE1 = parseInt(docSnap.data().PEmpatados) + parseInt(1)
            puntosAF1 = parseInt(docSnap.data().pAFavor) + parseInt(puntosA.campo)
            puntosEC1 = parseInt(docSnap.data().pEContra) + parseInt(puntosB.campo)

            await updateDoc(docRef, {
                PEmpatados: PE1,
                pAFavor: puntosAF1,
                pEContra: puntosEC1
                })
                console.log("existe")
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        const docRef2 = doc(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", equipoB);
        const docSnap2 = await getDoc(docRef2);

        if (docSnap2.exists()) {
            PE2 = parseInt(docSnap2.data().PEmpatados) + parseInt(1)
            puntosAF2 = parseInt(docSnap2.data().pAFavor) + parseInt(puntosB.campo)
            puntosEC2 = parseInt(docSnap2.data().pEContra) + parseInt(puntosA.campo)

            await updateDoc(docRef2, {
                PEmpatados: PE2,
                pAFavor: puntosAF2,
                pEContra: puntosEC2
                })
                console.log("existe")
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        }else{
            console.log(ganador.campo,perdedor.campo)
        const docRef = doc(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", finalPartidoG);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            PG1 = parseInt(docSnap.data().PGanados) + parseInt(1)
            puntosAF1 = parseInt(docSnap.data().pAFavor) + parseInt(pGan)
            puntosEC1 = parseInt(docSnap.data().pEContra) + parseInt(pPer)

            await updateDoc(docRef, {
                PGanados: PG1,
                pAFavor: puntosAF1,
                pEContra: puntosEC1
                })
                console.log("existe")
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        const docRef2 = doc(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos", finalPartidoP);
        const docSnap2 = await getDoc(docRef2);

        if (docSnap2.exists()) {
            PP2 = parseInt(docSnap2.data().PPerdidos) + parseInt(1)
            puntosAF2 = parseInt(docSnap2.data().pAFavor) + parseInt(pPer)
            puntosEC2 = parseInt(docSnap2.data().pEContra) + parseInt(pGan)

            await updateDoc(docRef2, {
                PPerdidos: PP2,
                pAFavor: puntosAF2,
                pEContra: puntosEC2
                })
                console.log("existe")
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        }







      await updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos", partido), {
           /* EquipoGanador: ganador.campo,
            EquipoPerdedor: perdedor.campo,*/
            PuntosE1: puntosA.campo,
            PuntosE2: puntosB.campo,
            PuntosR: true
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
                        
                    <FormInputSinCambioEst
                            label="Equipo 1: "
                            value = {equipoA}
                        />
                        <FormPuntaje
                            label="Puntaje equipo 1: "
                            placeholder="Ingrese el puntaje del equipo"
                            estado={puntosA}
                            cambiarEstado={cambiarPuntosA} 
                            expresionRegular = {expresiones.puntaje}
                            alerta="El puntaje solo contiene números"
                            id="1"
                        />
                        <FormInputSinCambioEst
                            label="Equipo 2: "
                            value = {equipoB}
                        />
                        <FormPuntaje
                            label="Puntaje equipo 2: "
                            placeholder="Ingrese el puntaje del equipo"
                            estado={puntosB}
                            cambiarEstado={cambiarPuntosB} 
                            expresionRegular = {expresiones.puntaje}
                            alerta="El puntaje solo contiene números"
                            id="1"
                        />

                        <div className='m-4 mt-0 negrita'>FALTAS
                        
                            <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Jugador</th>
                                <th>Equipo</th>
                                <th>Faltas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faltas.map((falta) => (
                                    <tr>
                                    <td>{falta.id}</td>
                                    <td>{falta.Equipo}</td>
                                    <td>{falta.NumFaltas}</td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
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
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Jugador</th>
                                <th>Equipo</th>
                                <th>Anotaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {anotaciones.map((anotacion) => (
                                    <tr>
                                    <td>{anotacion.id}</td>
                                    <td>{anotacion.Equipo}</td>
                                    <td>{anotacion.NumAnotaciones}</td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
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
                                texto='Cancelar'
                                manejarClic={""}
                                enlace={enlaceForm3}
                                />
                                
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