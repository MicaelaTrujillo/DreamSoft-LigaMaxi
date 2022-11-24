import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc, updateDoc} from "firebase/firestore";
import "../styles sheet/credencial.css";
import {useReactToPrint} from 'react-to-print';
import QRCode from 'qrcode';

function Credencial({nombreE, nombreJ} ){
  const componentRef =useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle : 'credencial'
    //size : 'A4'
    //onAfterPrint: () => alert('Descarga exitosa')
  });
    var cat="";
    const [categ, setCat] = useState([]);
    useEffect(() => {
      async function obtenerDatosEq() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombreE);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          //console.log("si entra al exist", docSnap.data());
            cat=docSnap.data().Categoria;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        setCat(cat)
        //console.log("Si daaaaaa", categ);
      }
      obtenerDatosEq();
    }, []);

    var fotO="";
    //const [nombreJug, setNomJ] = useState([]);
    const [foto, setFoto] = useState([]);
    useEffect(() => {
      async function obtenerDatosJug() {
        const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf", "Equipos", nombreE,"Jugadores",nombreJ);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          //console.log("si entra al exist", docSnap.data());
            //nomJ=docSnap.data().nombreJugador;
            fotO=docSnap.data().Foto;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        setFoto(fotO)
        //console.log("Si daaaaaa", nomJ);
      }
      obtenerDatosJug();
    }, []);
    
    //console.log("Fueraaaa", nomJ,alt);

    //-------------GenerarQR-----------------------------
   /* const [url, setUrl] = useState('');
    const [qrcode, setQrcode] = useState('');

    const GenerateQRCode = () => {
        QRCode.toDataURL(url, {
            width: 800,
            margin: 2,
            color:{
              dark: '#000000ff',
              light: '#ffffffff'
            } 
        }, (err, url) => {
          if(err) return console.error(err)
          setQrcode(url)
        })
    }
    setUrl=`/InformacionJugador/${nombreE}/${nombreJ}`;
    GenerateQRCode();
    */
    
  var nomEArr=removeSpacesFromString(nombreE);
  var nomJArr=removeSpacesFromString(nombreJ);
    var urlJ=`https://gorgeous-kataifi-6c7cb5.netlify.app/InformacionJugador/${nomEArr}/${nomJArr}`;
    const [url, setUrl] = useState('');
    useEffect(() => {
      QRCode.toDataURL(urlJ).then((data) => {
        setUrl(data);
      });
    } , [] )
return (
    
      <div className="container">
        
    <div className="main-info2 mt-5 mb-5 mx-0 " >
      
      <div ref = {componentRef} style={{width:'100%', height: "auto", alignItems:"center"}}>
        <div className="contenedor-Info2 row cont-main mt-5 mb-5 mx-0">

            <h2 className="tituloC">Credencial personal</h2>
          <div className="DatosCre">    
              <img 
                  className="fotoJug img-thumbnail mx-auto d-block "
                  src ={foto}
              />

              <div className="DetalleInf">
                  <h2 className="nombre "> {nombreJ}  </h2>

                  <h2 className="nombre ">Equipo: {nombreE}</h2>
                  
                  <h2 className="nombre ">Categoría: {categ}</h2>
                  
                  <h2 className="nombre ">JUGADOR </h2>
              </div>
                  
              <img 
                  className="fotoJug img-thumbnail mx-auto d-block "
                  src ={url}
                />
              
          </div>
    
        </div>
    
    </div>
     
    </div>
             <div className="cont-Boton">
              <Button onClick={handlePrint} className='botonCred'>Imprimir</Button>
             </div>
    

        </div>
);

}

export default Credencial;

const removeSpacesFromString = (text1) => { 
  let text2 =  
      text1.split(" ").join("%20"); 

  //document.querySelector('.outputString').textContent = text2; 
  return text2;
} 