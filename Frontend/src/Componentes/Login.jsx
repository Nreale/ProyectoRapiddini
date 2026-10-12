import { useState } from 'react'
import './Login.css'
import axios from "axios"
import {Link} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const HabilitedLogin = email.trim() !== '' && password.trim() !== ''

  const [Token, setToken] = useState('')


  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const CallLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: email.trim(),
        password: password.trim()
      })
      setToken(response.data.token)
      alert('Login realizado con exito')
    }catch (error) {
      console.log('Se ha producido un error')
    }

  }

  return (
    <>  
      <div className='login'>
        <form className='login__box' onSubmit={CallLogin}>
          <div className='login__loaddatta'>
            <h1>Iniciar Sesion</h1>
            <div className='login__loaddatta--fields'>
              <p>Email</p>
              <input onChange={changeEmail} type="text" placeholder='Ingrese su email'/>
              <p>Contraseña</p>
              <input onChange={changePassword} type="password" placeholder='Ingrese su contraseña' />
            </div>
          
            <div className='login__button--proceed'>
              <button type='submit' disabled={!HabilitedLogin}>Iniciar Sesion</button>
            </div>
          </div>

          <div className='login__buttons'>
            <div className='login__buttons--text'>
              <p>¿Nuevo por acá? Registrate para hacer tus pedidos o volvé al inicio.</p>
            </div>
            
            <Link className='login__buttons--decoration' to='/Register'>
              <button>Registrarse</button>
            </Link>
            
            
            <Link className='login__buttons--decoration' to='/Home'>
              <button>Volver</button>
            </Link>
            
          </div>
        </form>
      </div>
    </>
  )
}

export default Login