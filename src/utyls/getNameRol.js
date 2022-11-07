
import {db} from '../Firebase/ConexionBD';
import { doc, getDoc, getFirestore, query } from "firebase/firestore";
import { useState } from 'react';
//import {useCollectionData} from "react-firebase-hooks/firestore"
export const GetNameUser = (user) =>{

    const [delegadoName, setDelegado]= useState(null);
    console.log("estado actual del delegado", delegadoName);

    async function getDel(){
       
        const docRef = doc(db, `/Campeonato1/OKfiQOn7WhvKSck3A4Tf/Delegados/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await setDelegado(docSnap.data().NombreDelegado);
        } else {
        //doc.data() will be undefined in this case
            console.log("No such document!");
            setDelegado(null);
        
        }
    }
   
    
        let res = 'user'
        const {email} = user || {}
        console.log('el email',email)
        if(email){
            let aux = email.split('@');
            if(aux.includes('admin.com')){
                res= email
                console.log("creo que no esta entrando aqui nameee")
            }else if (aux.includes('apuntador.com')){
                res='Apuntador de Mesa'
            }else{
                getDel();
                res=delegadoName;
            }
            
        }
        return res;
}