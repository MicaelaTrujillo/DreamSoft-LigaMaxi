import Header from "./Header"
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'

function HomePage(props){
    console.log("homepage", props.id);
    return <div>
        <Header id={props.id} hidden="hidden"/>
        <Navbar>
            <div className='contenedor-texto navbar-texto'>
                
                <Link to="/FormularioPreInscripcion">Equipos</Link>
            
            </div>
        </Navbar>
    </div>
}

export default HomePage