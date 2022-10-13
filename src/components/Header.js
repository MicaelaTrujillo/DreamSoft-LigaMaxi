import '../styles sheet/header.css'
import React, { useState } from 'react';
import Modal from './Modal.js';

function Header(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <header className="Main-header header-background">
        <div className='contenedor-header'>
            <h2 className='header-text fila'>
                liga maxi basquet
            </h2>
            <button className='botonIs login fila' type='submit' onClick={handleShow}>Iniciar Sesión</button>
        </div>
        </header>
        <Modal show={show} handleClose={handleClose}/>
        </>
    );
}

export default Header