import React from 'react';
import FormInscripcion from '../components/FormInscripcion';
import HomePage from '../components/homePage';
import {useParams} from 'react-router-dom';

function FormuInscripcion() {
    const eqActual = useParams();
    console.log("en page del form de inscripcion",eqActual);
    return (
        <div>
             <HomePage/>
             <FormInscripcion nombre={eqActual.equipo} categoria={eqActual.categoria}/>

        </div>
        
    );
}

export default FormuInscripcion;