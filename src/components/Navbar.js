import '../styles sheet/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar (){
    return(
        <nav className="nav-background">
            <div className='contenedor-navbar'>
                <div className='contenedor-texto navbar-texto'>
                
                <nav>
                    <Link to="/">Inicio</Link>
                </nav>
                
                </div>
                <div className='contenedor-texto navbar-texto'>
                
                    <Link to="/FormularioRegistro">Registro</Link>
                
                </div>
                <div className='contenedor-texto navbar-texto'>
                
                    <Link to="/FormularioPreInscripcion">Pre inscripción</Link>
                
                </div>
            </div>
        </nav>
    );
}
export default Navbar;