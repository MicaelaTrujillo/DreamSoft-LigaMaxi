import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import FormularioPreInscripcion from "./pages/FormularioPreInscripcion";
import FormularioRegistro from "./pages/FormularioRegistro";
import FormularioCampeonato from "./pages/FormularioCampeonato";
import FormularioInscripcion from "./pages/FormularioInscripcion";
import FormularioRegistroJugador from "./pages/FormularioRegistroJugador";
import InformacionEquipo from "./pages/InformacionEquipo";
import Equipos from "./pages/Equipos";

import './App.css';

import Solicitudes from "./pages/Solicitudes";
import PrivateRoute from "./components/privateRutes";

import { UserContext } from '../src/context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from "../src/utyls/getRolUser";
import VistaInscripcion from "./pages/VistaInscripcion";

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
             <Route path="/FormularioInscripcion" element={<FormularioInscripcion/>}></Route>
             <Route path="/FormularioRegistroJugador/:equipo/:categoria" element={<FormularioRegistroJugador/>}></Route>
             <Route path="/InformacionEquipo" element={<InformacionEquipo/>}></Route>
             <Route path="/Equipos" element={<Equipos/>}></Route>
             <Route path="/Inscripciones" element={<VistaInscripcion/>}></Route>
             <Route path="/Inscripciones/FormularioInscripcion/:equipo/:categoria" element={<FormularioInscripcion/>}></Route>
          </Route>

          <Route element={<PrivateRoute isAllowed={!!user && userRol==="Administrador"}/>}>
            <Route exact path='/Solicitudes' element={<Solicitudes/>}/>
            
            <Route path="/FormularioCampeonato" element={<FormularioCampeonato/>}></Route>
          </Route>
          

        </Routes>
  );
}

export default App;
