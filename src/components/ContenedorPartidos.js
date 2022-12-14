import {FormInputs, FormComboBox,FormComboBoxPartidos,FormComboBoxEquipo1,FormComboBoxEquipo2, FormFechaPartidos, Boton, FormArchivo} from '../Elementos/ElementosForms'
import React, { useEffect, useState } from "react";
import "../styles sheet/ContenedorSol.css"
import TarjetaSol from "./TarjetaSol";
import { db } from "../Firebase/ConexionBD";
//import {getDocs,  collection,  where, query} from "firebase/firestore";
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../utyls/getRolUser";
import { doc, setDoc,getDocs,  collection,query,where, getDoc, updateDoc} from "firebase/firestore";
var contador=0;
function ContenedorPartidos(props){
    const [categoria, cambiarCategoria] = useState({campo: "", valido: null});
    const [equipo1, cambiarEquipo1] = useState({campo: "", valido: null});
    const [equipo2, cambiarEquipo2] = useState({campo: "", valido: null});
    const [fecha, cambiarFecha] = useState({campo: "", valido: null});
    const [equiposAdm, setAdm] = useState([]);
    const [equiposDel, setDel] = useState([]);
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
    const enlaceForm = '/'
    const [categ, setCateg] = useState([]);
    const [fecIni, cambiarFecIni] = useState({campo: "", valido: null});
    const [fecFin, cambiarFecFin] = useState({campo: "", valido: null});
    var fechaInicio = "";
    var fechaFin = "";
        // useEffect (() => {
        //     getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos")).then(
        //         (querySnapshot) => {
        //             const datos = querySnapshot.docs.map((doc) => ({
        //                 id: doc.id,
        //                 ...doc.data(),
        //             }));
        //             //console.log("datoos",datos);  
        //             setAdm(datos);
        //     });
        // }, []);
    function actualizar(estado){
        const q = query(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos"), where("Categoria", "==", estado));
            getDocs(q).then((querySnapshot) =>{
                const datosDel = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));  
                setDel(datosDel);
            });
            // equiposDel.unshift({id: '', NombreEquipo: '*asdasdads', Categoria: '30 años', Entrenador: ''});
            // equiposDel.unshift({id: '', NombreEquipo: '*asdasdads', Categoria: '35 años', Entrenador: ''});
            // equiposDel.unshift({id: '', NombreEquipo: '*asdasdads', Categoria: '40 años', Entrenador: ''});
            //console.log(equiposDel);
    }  
    function actEquipo1(estado){
        equipo1.campo= estado;
    }  
    function actEquipo2(estado){
        equipo2.campo= estado;
    }  
    async function onSubmit(e){
        //if(fecha.campo==)
        console.log('fecha:'+fecha.campo)
        //console.log("AAA",categoria.campo,equipo1.campo,equipo2.campo,fecha.campo,contador);
        e.preventDefault();
            // await updateDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos",contador), {
            //     Categoria: categoria.campo,
            //     Equipo1: equipo1.campo,
            //     Equipo2: equipo2.campo,
            //     FechaHora: fecha.campo,
            //     })
            //     alert("se registro existosamente")
            
            if(equipo1.campo==equipo2.campo){
                alert("Registro invalido, no se pueden enfrentar los mismos equipos")
            }else{
                contador++;
                var f= new Date(fecha.campo)
                console.log('fecha:'+f)
                await setDoc(doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Partidos",contador.toString()), {
                    Categoria: categoria.campo,
                    Equipo1: equipo1.campo,
                    Equipo2: equipo2.campo,
                    FechaHora: f,
                    PuntosR: false,
                    })
                    
                    alert("Registro exitoso")
            }
            
    }
    useEffect(() => { var categorias = ["*Seleccione categoría"]
    async function cat(){
    const querySnapshot = await getDocs(collection(db, "Campeonato1"));
    querySnapshot.forEach((doc) => {
      categorias = doc.data().Categorias
      categorias.unshift("*Seleccione categoría")
      //console.log("catego",categorias);
    });
    setCateg(categorias)
  }
  
  cat()
    async function obtenerDatos() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("si entra al exist", docSnap.data());
          fechaInicio = docSnap.data().FechaInicio.toDate();
          fechaInicio = (fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth()+1 > 9? fechaInicio.getMonth()+1: "0" + (fechaInicio.getMonth()+1)) + "-" + (fechaInicio.getDate() > 9? fechaInicio.getDate(): "0" + fechaInicio.getDate())  +" 00:00").toString()
          //fechaInicio2 = docSnap.data().FechaInicio.toDate();
          fechaFin = docSnap.data().FechaFin.toDate();
          fechaFin = (fechaFin.getFullYear() + "-" + (fechaFin.getMonth()+1 > 9? fechaFin.getMonth()+1: "0" + (fechaFin.getMonth()+1)) + "-" + (fechaFin.getDate() > 9? fechaFin.getDate(): "0" + fechaFin.getDate()) +" 00:00").toString()
          //fechaFin2 = docSnap.data().FechaFin.toDate();
          cambiarFecIni({campo:fechaInicio});
          cambiarFecFin({campo:fechaFin});
          //console.log(fecIni.campo,fecFin.campo);
        } else {
          // doc.data() will be undefined in this case
          
        }


      }
      obtenerDatos()    
}, []);

const fechaActual = Date.now();
const fasd= new Date(fechaActual);
const fechaCat=fasd.toISOString();
console.log("asd",fechaCat);
fecha.campo=fechaCat;
console.log("aaaaa",fecha.campo);

    return(
        <div className="container">
            <div className="main">
            <div className="contenedor-sol row cont-main mt-5 mb-5 mx-0">
                <h2 className="tituloE">{props.titulo}</h2>
                <p className="sub-titulo">{props.subtitulo}</p>
                {/* {userRol==='Administrador'? 
                    equiposAdm.map((equipo) => (
                    <TarjetaSol key = {equipo.id} name={equipo.NombreEquipo} categoria={equipo.Categoria} imagen={equipo.UrlImagen} habilitado={equipo.Habilitado}/>
                    ))
                    
                  : 
                    equiposDel.map((equipo) => (
                    <TarjetaSol key = {equipo.id} name={equipo.NombreEquipo} categoria={equipo.Categoria} imagen={equipo.UrlImagen} habilitado={equipo.Habilitado} inscrito={equipo.Inscrito}/>
                    ))
                    
                } */}
                <FormComboBoxPartidos
                    label="Categoría: "
                    arreglo = {categ}
                    estado={categoria}
                    cambiarEstado={cambiarCategoria} 
                    actualizar={actualizar}
                />

                <FormFechaPartidos 
                  label="Fecha de Partido:"
                  estado={fechaInicio}
                  cambiarEstado={cambiarFecha} 
                  fMin={fecIni.campo}
                  fMax={fecFin.campo}
                />

                <FormComboBoxEquipo1
                    label="Equipo 1: "
                    arreglo = {equiposDel.map(function(equipo){return equipo.NombreEquipo;})}
                    estado={equipo1}
                    cambiarEstado={cambiarEquipo1} 
                    actEquipo1={actEquipo1}
                />

                <FormComboBoxEquipo2
                    label="Equipo 2: "
                    arreglo = {equiposDel.map(function(equipo){return equipo.NombreEquipo;})}
                    estado={equipo2}
                    cambiarEstado={cambiarEquipo2} 
                    actEquipo2={actEquipo2}
                />

                <div className='botones'>
                    <Boton 
                        texto='Cancelar'
                        manejarClic=""
                        enlace = {enlaceForm}/>

                    <Boton type='submit'
                        texto='Registrar'
                        manejarClic={onSubmit}
                        enlace={enlaceForm}/>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default ContenedorPartidos;