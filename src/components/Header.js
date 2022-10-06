import '../styles sheet/header.css'

function Header(){
    return <header className="Main-header header-background">
        <div className='contenedor-header'>
            <h2 className='header-text fila'>
                liga maxi basquet
            </h2>
            <h4 className='login fila' href='./Login.js'>Iniciar Sesión</h4>
        </div>
    </header>
}

export default Header