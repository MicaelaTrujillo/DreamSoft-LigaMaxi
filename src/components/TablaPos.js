import React, { useEffect, useState, useRef } from "react";
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc,where, query} from "firebase/firestore";
import "../styles sheet/tablaPos.css";
import Table from 'react-bootstrap/Table';

function TablaPos( ){
    
    const [equipoos, setEquipos] = useState([]);
 
        useEffect (() => {
            getDocs(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos")).then(
                (querySnapshot) => {
                    const datos = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    //console.log("datoos",datos);  
                    setEquipos(datos);
            });
        }, []);

    var pos=0;
/*
    const [equiposCJ, setEquiposCJ] = useState([]);
    const [equiposSnJ, setEquiposSnJ] = useState([]);
        useEffect (() => {
            const q = query(collection(db, "Campeonato1","OKfiQOn7WhvKSck3A4Tf","Equipos"), where("pAFavor", "!=", null));
            getDocs(q).then((querySnapshot) =>{
                const equiposCinfo = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));  
                setEquiposCJ(equiposCinfo);
            /*
            for (let i = 0; i < equipoos.length; i++) {
                //const { valor } = equipoos[i]
                if(equipoos[i].pAFavor!=null){
                    setEquiposCJ(equipoos[i]);
                }else{
                    setEquiposSnJ(equipoos[i]);
                }
              }
              
            });
            
        }, []);
*/
        
    //var PFav=equip[3].pAFavor;
    let equiposJug=[];
    let equiposSJ=[];
    /*Object.keys(equipoos[0]).forEach(e => {
        if(equipoos[0].pAFavor!=null){
            equiposJug.push(equipoos[0][e]);
        }
        
      });*/

      /*Dividir en 2 arreglos para definir quienes si tienen puntaje */
      for (let i = 0; i < equipoos.length; i++) {
        //const { valor } = equipoos[i]
        if(equipoos[i].pAFavor!=null){
            equiposJug.push(equipoos[i]);
        }else{
            equiposSJ.push(equipoos[i]);
        }
        
      }

      /*Ordenar los equipos para definir posicion */
      equiposJug.sort( (a, b) => {
        if((a.PGanados*3+a.PEmpatados*1) > (b.PGanados*3+b.PEmpatados*1) ) {
          return -1;
        }
        if( (a.PGanados*3+a.PEmpatados*1) < (b.PGanados*3+b.PEmpatados*1)  ) {
          return 1;
        }
        if ((a.pAFavor-a.pEContra) > (b.pAFavor-b.pEContra) ) {
          return -1;
        }
        if ( (a.pAFavor-a.pEContra) < (b.pAFavor-b.pEContra) ) {
          return 1;
        }
        return 0;
      });

      /*console.log(equiposJug);
*/
      //console.log(equiposJug);


return (
    
    <div className="container">
        
        <div className="main-info3 mt-5 mb-5 mx-0 " >

            <div className="contenedor-Info3 row cont-main mt-5 mb-5 mx-0">

                <h2 className="tituloTab">Tabla de posiciones</h2>

      {        
                    <div>
                    <Table responsive="md" bordered hover>
                        <thead className="cabeceraTabla">
                        <tr>
                            <th>Posición</th>
                            <th>Nombre Equipo</th>
                            <th>PJ</th>
                            <th>PG</th>
                            <th>PE</th>
                            <th>PP</th>
                            <th>PF</th>
                            <th>PC</th>
                            <th>DP</th>
                            <th>P</th>
                        </tr>
                        </thead>
                        <tbody>
                        {equiposJug.map((equipo) => (
                        <tr>
                            <td>{pos=pos+1}</td>
                            <td>{equipo.NombreEquipo}</td>
                            <td>{equipo.PGanados+equipo.PEmpatados+equipo.PPerdidos}</td>
                            <td>{equipo.PGanados}</td>
                            <td>{equipo.PEmpatados}</td>
                            <td>{equipo.PPerdidos}</td>
                            <td>{equipo.pAFavor}</td>
                            <td>{equipo.pEContra}</td>
                            <td>{equipo.pAFavor-equipo.pEContra}</td>
                            <td>{equipo.PGanados*3+equipo.PEmpatados*1}</td>
                        </tr> ))
                        
                        }

                        {equiposSJ.map((equipo) => (
                        <tr>
                            <td>{pos=pos+1}</td>
                            <td>{equipo.NombreEquipo}</td>
                            <td colSpan={8}>Por definir</td>
                            
                        </tr> ))
                        
                        }   
                        </tbody>
                    </Table>
                    </div>
                    
        }
      
            </div>
    
        </div>
    </div>
);

}

export default TablaPos;
 