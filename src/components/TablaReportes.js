import React, { useEffect, useState } from "react";
import { db } from "../Firebase/ConexionBD";
import { getDocs,orderBy, where, query, collectionGroup, collection} from "firebase/firestore";
import "../styles sheet/tablaPos.css";
import Table from 'react-bootstrap/Table';

function TablaReportes(props){
    const b= props.buscar;
    b.toString();
    const cat= props.categoria;
    cat.toString();
    console.log("cat", cat);
    const [jugadores, setJugadores] = useState ([]);
    const [categorias, setCategoria] = useState ([]);
    const [cate, setC] = useState ([]);


        useEffect (() => {
            const museums = query(collectionGroup(db, 'Jugadores'), where(b, '>', 0), where('Categoria', '==', cat), orderBy(b, 'desc'));
            
             getDocs(museums).then(
                querySnapshot =>{
                    const q = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                 setJugadores(q);
                 console.log("ay por favor que funcione", jugadores);
                }
            );
        }, []);

        

      
return (            
        <div>
            <h4>Categoría: {props.categoria}</h4>
        <Table responsive="md" bordered hover>
            <thead className="cabeceraTabla">
            <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>{props.c4}</th>
            </tr>
            </thead>
            <tbody>
            {jugadores.map((jugador, index) => ( 
            <tr>
                <td>{index+1}</td>
                <td>{jugador.nombreJugador}</td>
                <td>{jugador.Equipo}</td>
                {b==='NumFaltas'?
                <td>{jugador.NumFaltas}</td>
                :
                <td>{jugador.NumAnotaciones}</td>
                }
                
            </tr> 
            ))}

                
            </tbody>
        </Table>
        </div>
      
    
);

}

export default TablaReportes;