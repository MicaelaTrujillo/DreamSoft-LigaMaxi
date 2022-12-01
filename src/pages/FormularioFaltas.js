import React from 'react';
import FormFaltas from '../components/FormFaltas'
import HomePage from '../components/homePage';
import {useParams} from 'react-router-dom';

function FormuFaltas() {
    const eqActual = useParams();
    return (
        <div>
             <HomePage/>
             <FormFaltas equipoA={eqActual.equipoA} equipoB={eqActual.equipoB} partido={eqActual.partido}/>

        </div>
        
    );
}

export default FormuFaltas;