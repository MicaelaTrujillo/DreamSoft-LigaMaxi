import React, { useEffect, useState } from "react";
import { db } from "../Firebase/ConexionBD";
import { getDocs,orderBy, where, query, collectionGroup, collection} from "firebase/firestore";
import "../styles sheet/tablaPos.css";
import Table from 'react-bootstrap/Table';
import TablaReportes from "./TablaReportes";

function ContenedorTablas(props){
    const [categorias, setCategoria] = useState ([]);
  
     /* useEffect (() => {
        const dataref= collection(db, "Campeonato1");
        const q = query(dataref);

        getDocs(q).then(
            (querySnapshot) => {
                const datos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data().Categorias,
                }));
                //const cat= datos;
                setCategoria(datos);
        });
    }, []);*/

    useEffect (() => {
        var categorias = ["*Seleccione categoría"]
      async function cat(){
      const querySnapshot = await getDocs(collection(db, "Campeonato1"));
      querySnapshot.forEach((doc) => {
        categorias = doc.data().Categorias
        //categorias.unshift("*Seleccione categoría")
        //console.log("catego",categorias);
      });
      setCategoria(categorias)
    }
    
    cat()
    }, []);

      console.log("categorias01", categorias);
return (
    
    <div className="container">
        
        <div className="main-info3 mt-5 mb-5 mx-0 " >

            <div className="contenedor-Info3 row cont-main mt-5 mb-5 mx-0">

                <h2 className="tituloTab">{props.titulo}</h2>
                {categorias.map((cat) => (
                    <TablaReportes categoria={cat} buscar={props.buscar} c4={props.c4}/>
                ))}
            </div>
    
        </div>
    </div>
);

}

export default ContenedorTablas;