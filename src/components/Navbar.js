import '../styles sheet/Navbar.css'
function Navbar (){
    return(
        <nav className="nav-background">
            <div className='contenedor-navbar'>
                <div className='contenedor-texto navbar-texto'>
                    Inicio
                </div>
                <div className='contenedor-texto navbar-texto'>
                    Registro
                </div>
            </div>
        </nav>
    );
}
export default Navbar;