import React from 'react';
import '../styles sheet/invpub.css'

import { useState,useEffect } from 'react';
import { app, db } from "../Firebase/ConexionBD";
import { doc, setDoc,getDocs,  collection, getDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import Table from 'react-bootstrap/Table';
    

/*
    const [archivoUrl, setArchivoUrl] = React.useState("");
    const [docus, setDocus] = React.useState([]);
 React.useEffect(async()=>{
    const docusList= await app.firestore().collection("Campeonato1").get();
    setDocus(docusList.docs.map((doc)=>doc.data()));
 },[])  */
    /*function recuperar(inv){
        linkImag=inv;
        return inv;
        
    }*/

   /* const [stringImage, setstringImage] = useState('');
  useEffect(() => {
    async function obtenerImag() {

      const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("si entra al exist", docSnap.data());
        var invPublica = docSnap.data().invitacion;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
      setstringImage(invPublica)
      console.log(stringImage, "Funcionaaaa");
    }
    obtenerImag();
  }, []);*/

/*
  export const useData = (collectionName) => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
      const unsub = db.collection(collectionName)
        .onSnapshot(snap => {
          const documents = [];
          snap.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() })
          });
          setDocs(documents);
        });
      // Limpiar el componente
      return () => unsub();
    }, [collectionName]);
    return { docs }
  }*/

/*
  const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("si entra al exist", docSnap.data());
       var invitacionPublica = docSnap.data().invitacion;

 console.log(linkImag,"VVVV2222222");
 
*/
var textInv="";
const Invpublica = () =>{
/*async function obtenerImag() {
      const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("si entra al exist", docSnap.data());
       var invitacionPublica = docSnap.data().invitacion;
        //linkImag= docSnap.data().invitacion;
        //recuperar(invitacionPublica);
        linkImag=invitacionPublica;
        console.log(linkImag,"Si fuunc")

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    obtenerImag();
*/

var fIni = "";
var fFin = "";
var cat = "";
var fPreIni = "";
var fPreFin = "";
var fInscrip = "";

const [imageInvPub, setstringImage] = useState('');
const [fechaIni, setfecIni] = useState('');
const [fechaFin, setfecFin] = useState('');
const [categ, setCateg] = useState('');
const [fechaIniPre, setfecIniPre] = useState('');
const [fechaFinPre, setfecFinPre] = useState('');
const [fechaInscrip, setfecInscrip] = useState('');

  useEffect(() => {
    async function obtenerImag() {
      const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("si entra al exist", docSnap.data());
        var invitacionPublica = docSnap.data().Invitacion;
        var text= docSnap.data().TextoInvitacionP;
        fIni = docSnap.data().FechaInicio.toDate();
        fIni = ((fIni.getDate() > 9? fIni.getDate(): "0" + fIni.getDate())+ "/" + (fIni.getMonth()+1 > 9? fIni.getMonth()+1: "0" + (fIni.getMonth()+1)) + "/" + fIni.getFullYear()  ).toString()
        fFin = docSnap.data().FechaFin.toDate();
        fFin = ((fFin.getDate() > 9? fFin.getDate(): "0" + fFin.getDate())+ "/" + (fFin.getMonth()+1 > 9? fFin.getMonth()+1: "0" + (fFin.getMonth()+1)) + "/" + fFin.getFullYear()  ).toString()
        cat = docSnap.data().Categorias;
        var categSep = cat.toString() 
        fPreIni = docSnap.data().FechaIniConvocatoria.toDate();
        fPreIni = ((fPreIni.getDate() > 9? fPreIni.getDate(): "0" + fPreIni.getDate())+ "/" + (fPreIni.getMonth()+1 > 9? fPreIni.getMonth()+1: "0" + (fPreIni.getMonth()+1)) + "/" + fPreIni.getFullYear()  ).toString()
        
        fPreFin = docSnap.data().LimitePreInsc.toDate();
        fPreFin = ((fPreFin.getDate() > 9? fPreFin.getDate(): "0" + fPreFin.getDate())+ "/" + (fPreFin.getMonth()+1 > 9? fPreFin.getMonth()+1: "0" + (fPreFin.getMonth()+1)) + "/" + fPreFin.getFullYear()  ).toString()
        
        fInscrip = docSnap.data().LimiteInscrip.toDate();
        fInscrip = ((fInscrip.getDate() > 9? fInscrip.getDate(): "0" + fInscrip.getDate())+ "/" + (fInscrip.getMonth()+1 > 9? fInscrip.getMonth()+1: "0" + (fInscrip.getMonth()+1)) + "/" + fInscrip.getFullYear()  ).toString()
        

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
     // console.log("Urls",invitacionPublica);
      var imageInvi = "";
      imageInvi=invitacionPublica;
      
      textInv=text;
      setstringImage(imageInvi)
      setfecIni(fIni)
      setfecFin(fFin)
      setCateg(categSep)
      setfecIniPre(fPreIni)
      setfecFinPre(fPreFin)
      setfecInscrip(fInscrip)
      //settext(textInv)
      //console.log("Si daaaaaa", imageInvPub);
      //console.log("Si daaaaaa", fechaIni,fechaFin,categ);
    }
    obtenerImag();
  }, []);


    return (
      <div className= 'inv-publica'>
            <div className='texto-inv'>
                <h2>INVITACIÓN PÚBLICA</h2>
            </div>
            <img 
                className="img-thumbnail mx-auto d-block imagen-invi"
                
                src ={imageInvPub}
            />
            <div className='contenedorText'>
              <h2 className='text-style'>
                {textInv}
              </h2>
            </div>
            
            
            <div className='container'>
              <div>
                    <Table responsive="md" bordered hover>
                        <thead className="cabeceraTabla">
                        <tr>
                            <th>Información</th>
                            <th>Detalle</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        
                        <tr>
                          <td>Fecha de inicio del campeonato</td>
                          <td>{fechaIni}</td>
                        </tr> 
                        
                        <tr>
                          <td>Fecha final del campeonato</td>
                          <td>{fechaFin}</td>
                        </tr> 

                        <tr>
                          <td>Categorías</td>
                          <td>{categ}</td>
                        </tr> 

                        <tr>
                          <td>Fecha de inicio de la pre-inscripción </td>
                          <td>{fechaIniPre}</td>
                        </tr> 

                        <tr>
                          <td>Fecha límite de la pre-inscripción</td>
                          <td>{fechaFinPre}</td>
                        </tr> 

                        <tr>
                          <td>Fecha límite de inscripción</td>
                          <td>{fechaInscrip}</td>
                        </tr> 
                          
                        </tbody>
                    </Table>
                    </div>
            </div>
        </div>
    );
}

export default Invpublica;