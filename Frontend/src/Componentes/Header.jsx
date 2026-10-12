import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import { useLocation } from 'react-router-dom';

function Cabecera() {
    const [estadoToken, setEestadoToken] = useState(false)
    const location = useLocation();

  
    if (location.pathname === '/Login' || location.pathname === '/Register') {
        return null;
    }
  return (
    <>
      <div className='menu'>

        <div className='menu__logo'>

        </div>
        <div className='menu__searchbar'>
            <div >

            </div>
            <div>

            </div>
        </div>
        
        {estadoToken ? (
            <div className='menu__buttons'>
                <div className='menu__icons'>
                    
                </div>
                <div className='menu__icons'>

                </div>    
            </div>
        ):(
            <div className='menu__buttons'>
                <div className='menu__icons'>
                    <Link id='decoration--none' to='/Login'>
                    <button>Login</button>
                    </Link>
                </div>
                <div className='menu__icons'>
                    <Link id='decoration--none' to='/Register'>
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