import Header from "./Header"
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'

function HomePage(){
    return <div>
        <Header />
        <Navbar>
            <div className='contenedor-texto navbar-texto'>
                
                <Link to="/FormularioPreInscripcion">Equipos</Link>
            
            </div>
        </Navbar>
    </div>
}

export default HomePage