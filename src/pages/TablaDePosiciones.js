import React from "react";
import HomePage from "../components/homePage";
import ContenedorTabPos from "../components/ContenedorTabPos";
import {useParams} from 'react-router-dom';

function TablaDePosiciones(){
    
    return(

       <div>
             <HomePage/>
             <ContenedorTabPos/>
       </div>
    );
    
}

export default TablaDePosiciones;