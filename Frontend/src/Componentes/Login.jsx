import { useState } from 'react'
import './Login.css'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const HabilitedLogin = email.trim() !== '' && password.trim() !== ''

  const navigate = useNavigate()

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const CallLogin = async (e) => {
    setErrorMsg('')
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/Usuario/IniciarSesion', {
        email: email.trim(),
        password: password.trim()
      })
      localStorage.setItem('token', response.data.token)
      navigate('/')
    }catch (error) {
      console.log('Se ha producido un error')
      const mensajeServidor = error.response?.data?.message || "Error inesperado"
      setErrorMsg(mensajeServidor)
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
            
            {errorMsg && <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>{errorMsg}</p>}
          
            <div className='login__button--proceed'>
              <button type='submit' disabled={!HabilitedLogin}>Iniciar Sesion</button>
            </div>
          </div>

          <div className='login__buttons'>
            <div className='login__buttons--text'>
              <p>¿Nuevo por acá? Registrate para hacer tus pedidos o volvé al inicio.</p>
            </div>
            
            <Link className='login__buttons--decoration' to='/RegisterType'>
              <button>Registrarse</button>
            </Link>
            
            <Link className='login__buttons--decoration' to='/'> 
              <button>Volver</button>
            </Link>
            
          </div>
        </form>
      </div>
    </>
  )
}

export default Login