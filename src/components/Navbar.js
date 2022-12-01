import '../styles sheet/Navbar.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from '../utyls/getRolUser';

const routes={
    user:[
        {
            name: 'Registro',
            path: '/FormularioRegistro'
        },
        
    ],
    Administrador:[
        {
            name: 'Solicitudes',
            path: '/Solicitudes',
        },
        {
            name: 'Campeonato',
            path: '/FormularioCampeonato'
        },
        
        
    ],
    Delegado:[
        {
            name: 'Pre Inscripción',
            path: '/FormularioPreInscripcion'
        },
        {
            name: 'Inscripción',
            path: '/Inscripciones'
        },
        
    ],
    apuntador:[
        {
            name: 'Mesa',
            path: '/FormularioPreInscripcion'
        },
        {
            name: 'Registro Planilla',
            path: '/FormularioPlanilla'
        },
    ],
}
function Navbar (){
    const {user} = useContext(UserContext);
    const userRol = GetRolUser(user);
    console.log("existe este us", userRol);
    return(
        <nav className="nav-background">
            <div className='contenedor-navbar'>
                <div className='contenedor-texto navbar-texto'>
                    <nav>
                        <Link to="/">Inicio</Link>
                    </nav>
                </div>
                <div className='contenedor-texto navbar-texto'>   
                <nav>
                    <Link to="/Equipos">Equipos</Link>
                </nav>          
                    
                </div>

                {user? 
            
                routes[userRol]?.map(({name, path}) => (
                    <div className='contenedor-texto navbar-texto'>
                        <nav>  
                            <Link to={path}>{name}</Link>
                        </nav>
                    </div>
                ))
            
         : 
        
        <div className='contenedor-texto navbar-texto'>             
            <Link to="/FormularioRegistro">Registro</Link>
        </div>

        
        }
        </div>
        </nav>
        
    );
}
export default Navbar;