import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormularioPreInscripcion from "./pages/FormularioPreInscripcion";
import FormularioRegistro from "./pages/FormularioRegistro";
import FormularioCampeonato from "./pages/FormularioCampeonato";
import FormularioInscripcion from "./pages/FormularioInscripcion";

import './App.css';
import { app } from "./Firebase/ConexionBD";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "react-router-dom"
import UserProvider from "./context/userProvider";

function App() {

  
  return (
    <UserProvider>
       <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/FormularioPreInscripcion" element={<FormularioPreInscripcion/>}></Route>
          <Route path="/FormularioRegistro" element={<FormularioRegistro/>}></Route>
          <Route path="/FormularioCampeonato" element={<FormularioCampeonato/>}></Route>
          <Route path="/FormularioInscripcion" element={<FormularioInscripcion/>}></Route>
        </Routes>
    </UserProvider>
  );
}

export default App;
