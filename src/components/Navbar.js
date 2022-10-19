import '../styles sheet/Navbar.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/userProvider';
import { useContext } from 'react';
import { GetRolUser } from '../utyls/getRolUser';

const routes={
    user:[
        {
            name: 'Pre Inscripción',
            path: '/FormularioPreInscripcion'
        },
        {
            name: 'Equipos',
            path: '/FormularioPreInscripcion'
        }
    ],
    admin:[
        {
            name: 'Notificaciones',
            path: '/Notificaciones'
        }
    ],
    Delegado:[
        {
            name: 'Pre Inscripción',
            path: '/FormularioPreInscripcion'
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
                
        {user? 
            <div className='contenedor-texto navbar-texto'>
            {
                routes[userRol]?.map(({name, path}) => (
                    <Link to={path}>{name}</Link>
                ))
            }
        
        </div>  
            
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