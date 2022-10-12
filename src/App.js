import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormularioPreInscripcion from "./pages/FormularioPreInscripcion";
import FormularioRegistro from "./pages/FormularioRegistro";

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./Firebase/ConexionBD";

/*import logo from './logo.svg';*/
import './App.css';


function App() {

//  async function prueba(){
//   const docRef = doc(db, "Campeonato1", "OKfiQOn7WhvKSck3A4Tf");
//   const docSnap = await getDoc(docRef);
  
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
//  }
//  prueba();

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
