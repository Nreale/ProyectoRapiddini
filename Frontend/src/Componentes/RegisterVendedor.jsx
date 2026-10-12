
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import axios from "axios"
import './RegisterVendedor.css'

function RegisterVendedor() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [fecha_nacimiento, setFecha] = useState("")
  const [genero, setGenero] = useState("")
  const [CUIT, setCuit] = useState("")
  const [razon_social, setRazon_social] = useState("")
  const [Id_Usuario, setId_Usuario] = useState("")
  const [error, setError] = useState()

  const RegistrarUsuario = async (nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero) =>{
        
        try {
            const response = await axios.post("http://localhost:3000/Usuario/Registrarte", {
                nombre,
                apellido,
                email,
                telefono,
                contraseña,
                fecha_nacimiento,
                genero,

            })

            console.log(response.data)
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response) {
                console.log("entro")
                setError(error.response.data)
                console.log(setError)
            }
        }
  }

  const RegistrarVendedor = async (nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero, CUIT, razon_social) => {
    try {
      RegistrarUsuario(nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero)

      const response = await axios.post("http://localhost:3000/Usuario/Registrarte")
    } catch (error) {
      
    }
  }

  return (
    <>  
      <div className='register'>
          <div  className='register__form' > 
            <div className='register__form--title'>
                <h1>Crea tu cuenta</h1>
                <p>Pedí tus comidas favoritas en segundos</p>
            </div>
            <div className='register__from--fields'>
                <input type="text" value={nombre} placeholder='Nombre' onChange={(e)=> {setNombre(e.target.value)}}/>
                <input type="text" value={apellido} placeholder='Apellido' onChange={(e)=> {setApellido(e.target.value)}}/>
                <input type="email" value={email} placeholder='Email' onChange={(e)=> {setEmail(e.target.value)}}/>
                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Selecciona una opcion</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <input type="tel" pattern="\+?[0-9]{8,15}" placeholder="+5491122334455" value={telefono} onChange={(e)=> {setTelefono(e.target.value)}}/>
                <input type="password" value={contraseña} placeholder='Contraseña' onChange={(e)=> {setContraseña(e.target.value)}}/>
                <input type="date" value={fecha_nacimiento} placeholder='Fecha Nacimiento' onChange={(e)=> {setFecha(e.target.value)}}/>
                <input type="text" value={CUIT} placeholder='CUIT' onChange={(e)=> {setCuit(e.target.value)}}/>
                <input type="text" value={razon_social} placeholder='Razon Social' onChange={(e)=> {setRazon_social(e.target.value)}}/>
            </div>
            <br />
            <Link to='/RegisterType'>Volver para atras</Link>
            {error? (<p>Mensaje: {error.message}</p>):(<></>)}
            <div className='register__from--button'>
                <button onClick={(e)=>{RegistrarVendedor(nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero)}}>ENVIAR</button>
            </div>
            

          </div>
      </div>
    </>
  )
}

export default RegisterVendedor