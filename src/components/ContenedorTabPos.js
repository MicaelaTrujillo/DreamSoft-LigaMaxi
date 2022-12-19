import React, { useEffect, useState } from "react";
import { db } from "../Firebase/ConexionBD";
import { getDocs,orderBy, where, query, collectionGroup, collection} from "firebase/firestore";
import "../styles sheet/tablaPos.css";
import Table from 'react-bootstrap/Table';
import TablaPos from "./TablaPos";

function ContenedorTabPos(){
    const [categorias, setCategoria] = useState ([]);
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

      //console.log("categorias01", categorias);
return (
    
    <div className="container">
        
        <div className="main-info3 mt-5 mb-5 mx-0 " >

            <div className="contenedor-Info3 row cont-main mt-5 mb-5 mx-0">
            <h2 className="tituloTab">Tabla de posiciones</h2>

                {categorias.map((cat) => (
                    <TablaPos categoria={cat}  />
                ))}
            </div>
    
        </div>
    </div>
);

}

export default ContenedorTabPos;