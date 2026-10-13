import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo_placeholder.jpg';

function Cabecera() {
    const [estadoToken, setEestadoToken] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const location = useLocation();

    if (
        location.pathname === '/Login' || 
        location.pathname === '/Register' || 
        location.pathname === '/RegisterType' || 
        location.pathname === '/RegisterUser' || 
        location.pathname === '/RegisterVendedor' || 
        location.pathname === '/RegisterRepartidor'
    ) {
        return null;
    }

    const handleBuscar = (e) => {
        e.preventDefault()
        console.log('Buscando:', busqueda)
    }

  return (
    <>
      <div className='menu'>

        <div className='menu__logo'>
            <Link to="../assets/logo_placeholder.jpg">
                <img src={logo} alt="Logo de la app" className="menu__logo-img" />
            </Link>
        </div>

        <form className='menu__searchbar' onSubmit={handleBuscar}>
            <input 
                type='text' 
                placeholder='Barra de búsqueda 6767676767' 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className='searchbar__input'
            />
            <button type='submit' className='searchbar__button'>
                Buscar
            </button>
        </form>
        
        {estadoToken ? (
            <div className='menu__buttons'>
                <div className='menu__icons'></div>
                <div className='menu__icons'></div>    
            </div>
        ) : (
            <div className='menu__buttons'>
                <div className='menu__icons'>
                    <Link id='decoration--none' to='/Login'>
                        <button>Login</button>
                    </Link>
                </div>
                <div className='menu__icons'>
                    <Link id='decoration--none' to='/RegisterType'>
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        )}
    
      </div>
    </>
  )
}

export default Cabecera