
    import { useState } from 'react'
    import {Link} from 'react-router-dom'
    import './Login.css'
    import axios from "axios"
    import './RegisterRepartidor.css'

    function RegisterRepartidor() {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [fecha_nacimiento, setFecha] = useState("")
    const [genero, setGenero] = useState("")
    const [vehiculo, setVehiculo] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [fecha_emision, setEmision] = useState("")
    const [tipo_licencia, setTipo_licencia] = useState("")
    const [error, setError] = useState()


    const RegistrarRepartidor = async (nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero, Vehiculo, Nacionalidad, fecha_emision, tipo_licencia) => {
        try {
            setError("")
            const response = await axios.post("http://localhost:3000/Repartidores/RegistrarRepartidor", {
                nombre, 
                apellido, 
                email, 
                telefono, 
                contraseña, 
                fecha_nacimiento, 
                genero, 
                vehiculo, 
                nacionalidad, 
                fecha_emision,
                tipo_licencia
            })


        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response) {
                setError(error.response.data)
            }
        }
    }

    return (
        <>  
        <div className='register'>
            <div  id= "repartidor"className='register__form' > 
                <div className='register__form--title'>
                    <h1>Crea tu cuenta</h1>
                    <p>Reparte tus comidas favoritas en segundos</p>
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
                    <select value={vehiculo} onChange={(e) => setVehiculo(e.target.value)}>
                        <option value="">Selecciona una opcion</option>
                        <option value="Moto">Moto</option>
                        <option value="Auto">Auto</option>
                        <option value="Bicicleta">Bicicleta</option>
                    </select>
                    <select value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)}>
                        <option value="">Selecciona una opcion</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Chile">Chile</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <br />
                    <span>Fecha de Emision</span>
                    <input type="date" value={fecha_emision} placeholder='Fecha de Emision' onChange={(e)=> {setEmision(e.target.value)}}/>
                    <select value={tipo_licencia} onChange={(e) => setTipo_licencia(e.target.value)}>
                        <option value="">Selecciona una opcion</option>
                        <option value="Clase A">Clase A</option>
                        <option value="Clase B">Clase B</option>
                        <option value="Profesional">Profesional</option>
                    </select>
                </div>
                <br />
                <Link to='/RegisterType'>Volver para atras</Link>
                {error? (<p>Mensaje: {error.message}</p>):(<></>)}
                <div className='register__from--button'>
                    <button onClick={(e)=>{RegistrarRepartidor(nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero, vehiculo, nacionalidad, fecha_emision, tipo_licencia)}}>ENVIAR</button>
                </div>
                
            </div>
        </div>
        </>
    )
    }

    export default RegisterRepartidor