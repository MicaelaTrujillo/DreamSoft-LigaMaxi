import {Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FormularioPreInscripcion from "./pages/FormularioPreInscripcion";
import FormularioRegistro from "./pages/FormularioRegistro";
import FormularioCampeonato from "./pages/FormularioCampeonato";
import FormularioInscripcion from "./pages/FormularioInscripcion";

import './App.css';

import Solicitudes from "./pages/Solicitudes";
import PrivateRoute from "./components/privateRutes";

import { UserContext } from '../src/context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../src/utyls/getRolUser";

function App() {
  const {user} = useContext(UserContext);
  const userRol = GetRolUser(user);
  console.log("en app este es el usuario", user);
  return (
       <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/FormularioRegistro" element={<FormularioRegistro/>}></Route>

          <Route element={<PrivateRoute isAllowed={!!user}/>}>
             <Route path="/FormularioPreInscripcion" element={<FormularioPreInscripcion/>} />
          </Route>

          <Route element={<PrivateRoute isAllowed={!!user && userRol=="admin"}/>}>
            <Route exact path='/Solicitudes' element={<Solicitudes/>}/>
          </Route>
          

        </Routes>
  );
}

export default App;
