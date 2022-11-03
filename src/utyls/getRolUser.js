
import {db} from '../Firebase/ConexionBD';
import { doc, getDoc, getFirestore, query } from "firebase/firestore";
import { useState } from 'react';
//import {useCollectionData} from "react-firebase-hooks/firestore"
export const GetRolUser = (user) =>{
    const [delegado, setDelegado]= useState(null);
    let res = 'user'
    const {email} = user || {}
    console.log('el email',email)
        if(email){
            let aux = email.split('@');
            if(aux.includes('admin.com')){
                res= 'admin'
                console.log("creo que no esta entrando aqui")
            }else if(aux.includes('apuntador.com')){
                res='apuntador'
            }else {
                getDel();
                res=delegado;
            }
            
        }

    async function getDel(){
       
        const docRef = doc(db, `/Campeonato1/OKfiQOn7WhvKSck3A4Tf/Delegados/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await setDelegado(docSnap.data().Rol);
        } else {
        //doc.data() will be undefined in this case
            console.log("No such document!");
            setDelegado(null);
        
        }
    }
        
        console.log("us actual", delegado)
        return res;

}