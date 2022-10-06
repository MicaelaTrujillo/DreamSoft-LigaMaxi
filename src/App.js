import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormularioPreInscripcion from "./pages/FormularioPreInscripcion";
import FormularioRegistro from "./pages/FormularioRegistro";

/*import logo from './logo.svg';*/
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*rutas publicas */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/FormularioPreInscripcion" element={<FormularioPreInscripcion/>}></Route>
        <Route path="/FormularioRegistro" element={<FormularioRegistro/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
