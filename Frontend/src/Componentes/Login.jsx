import { useState } from 'react'
import './Login.css'
import axios from "axios"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviar, setEnviar] = useState(true)

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
        email,
        password
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
              <button type='submit'>Iniciar Sesion</button>
            </div>
          </div>

          <div className='login__buttons'>
            <div className='login__buttons--register'>

            </div>
            <div className='login__buttons--back'>
            
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login