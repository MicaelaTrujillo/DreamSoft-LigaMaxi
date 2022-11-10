import '../styles sheet/header.css'
import React, { useState, useContext } from 'react';
import Modal from './Modal.js';
import { auth } from '../Firebase/ConexionBD';
import { UserContext } from '../context/userProvider';
import { async } from '@firebase/util';
import {db} from '../Firebase/ConexionBD';
import { collection} from "firebase/firestore";
import { GetNameUser } from '../utyls/getNameRol';
import { Navigate, Route } from 'react-router-dom';
import { GetRolUser } from '../utyls/getRolUser';


function Header(){
    const [show, setShow] = useState(false);
    const [cerrarSesion, setSesion]= useState(false);
    const {user,signOutUser} = useContext(UserContext);
    const [userLogin, setUserLogin] = useState(null);

    const userName = GetNameUser(user);
    const userRol = GetRolUser (user);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const cerrar = async () => {
        setShow(false);
        try {
            console.log("entra aqui");
            <Route path="/" element={<Navigate to="/FormularioRegistro" />} />
            await signOutUser();
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <>
        <header className="Main-header header-background">
        <div className='contenedor-header'>
            <h2 className='header-text fila'>
                LIGA MAXI BASQUET
            </h2>
            <div className='fila columna'>
                <button className='botonIs login' type='submit' onClick= {() => 
                    {user? cerrar() : handleShow()}
                    }>{user? "Cerrar Sesión" : "Iniciar Sesión"}
                </button>
                <p> {user?  <>{userRol? userRol : ""} </>: ""}</p>
                <p> {user?  <>{userName? userName : ""} </>: ""} </p>
            </div>
        </div>
        </header>
        <Modal show={show} handleClose={handleClose} setShow={setShow}/>
        </>
    );
}

export default Header