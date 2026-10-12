import { useState } from 'react'
import './Register.css'

function Register() {
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [email, setEmail] = useState()
    const [telefono, setTelefono] = useState()
    const [contraseña, setContraseña] = useState()
    const [fecha_nacimiento, setFecha] = useState()
    const [genero, setGenero] = useState()
    const [error, setError] = useState()

    const [pais, setPais] = useState('')

    const Registrarse = async (nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero) =>{
        try {
            const response = await axios.post("http://localhost:3000/Usuarios/Registrarte", {
                nombre,
                apellido,
                email,
                telefono,
                contraseña,
                fecha_nacimiento,
                genero,

            })
        } catch (error) {
            
        }
    }

  return (
    <>
      <div className='register'>
          <form onSubmit={Registrarse()} className='register__form'>
            <div className='register__form--title'>
                <h1>Crea tu cuenta</h1>
                <p>Pedí tus comidas favoritas en segundos</p>
            </div>
            <div className='register__from--fields'>
                <input type="text" value={nombre} placeholder='Nombre' onChange={(e)=> {setNombre(e.target.value)}}/>
                <input type="text" value={apellido} placeholder='Apellido' onChange={(e)=> {setApellido(e.target.value)}}/>
                <input type="email" value={email} placeholder='Email' onChange={(e)=> {setEmail(e.target.value)}}/>
                <select value={pais} onChange={(e) => setPais(e.target.value)}>
                    <option value="">Selecciona una opcion</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <input type="tel" value={telefono} placeholder='Telefono' onChange={(e)=> {setTelefono(e.target.value)}}/>
                <input type="password" value={contraseña} placeholder='Contraseña' onChange={(e)=> {setContraseña(e.target.value)}}/>
                <input type="date" value={fecha_nacimiento} placeholder='Fecha Nacimiento' onChange={(e)=> {setFecha(e.target.value)}}/>
            </div>
            <div className='register__from--button'>
                <button></button>
            </div>
            

          </form>
      </div>
    </>
  )
}

export default Register