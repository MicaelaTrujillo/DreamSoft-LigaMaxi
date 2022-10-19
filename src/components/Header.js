import '../styles sheet/header.css'
import React, { useState } from 'react';
import Modal from './Modal.js';
import { auth } from '../Firebase/ConexionBD';

function Header(props){
    const [show, setShow] = useState(false);
    const [cerrarSesion, setSesion]= useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const cerrar = () => auth.signOut();

    let ini= "Iniciar Sesión";
    let accion="hola";
    if(props.id){
        ini= "Cerrar Sesión";
        const a = () => setSesion(true);
        console.log("entro");
    }

    console.log(cerrarSesion);
    
    return (
        <>
        <header className="Main-header header-background">
        <div className='contenedor-header'>
            <h2 className='header-text fila'>
                liga maxi basquet
            </h2>
            <div className='fila columna'>
                <button className='botonIs login' type='submit' onClick= {() => 
                    {cerrarSesion? cerrar() : handleShow()}
                    }>{ini}
                </button>
                <p >{props.user}  {props.name}</p>
              
            </div>
        </div>
        </header>
        <Modal show={show} handleClose={handleClose}/>
        </>
    );
}

export default Header