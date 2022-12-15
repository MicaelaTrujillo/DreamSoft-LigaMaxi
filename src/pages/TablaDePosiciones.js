import React from "react";
import HomePage from "../components/homePage";
import TablaPos from "../components/TablaPos";
import {useParams} from 'react-router-dom';

function TablaDePosiciones(){
    
    return(

       <div>
             <HomePage/>
             <TablaPos/>
       </div>
    );
    
}

export default TablaDePosiciones;