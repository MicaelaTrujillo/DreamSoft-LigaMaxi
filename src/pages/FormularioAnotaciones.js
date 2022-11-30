import React from 'react';
import FormAnotaciones from '../components/FormAnotaciones'
import HomePage from '../components/homePage';
import {useParams} from 'react-router-dom';

function FormuAnotaciones() {
    const eqActual = useParams();
    return (
        <div>
             <HomePage/>
             <FormAnotaciones equipoA={eqActual.equipoA} equipoB={eqActual.equipoB} partido={eqActual.partido}/>

        </div>
        
    );
}

export default FormuAnotaciones;