import React from 'react';
import FormPlanilla from '../components/FormPlanilla'
import HomePage from '../components/homePage';
import {useParams} from 'react-router-dom';

function FormuPlanilla() {
    const partido = useParams();
    return (
        <div>
             <HomePage/>
             <FormPlanilla id={partido.partido} equipo1={partido.equipoA} equipo2={partido.equipoB}/>

        </div>
        
    );
}

export default FormuPlanilla;