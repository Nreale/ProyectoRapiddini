import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './RegisterRepartidor.css'

function RegisterRepartidor() {
    const navigate = useNavigate()
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
    const [error, setError] = useState(null)

    const Registrarse = async (e) => {
        e.preventDefault();
        try {
            setError(null)
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

            if (response.status === 201) {
                navigate('/Login'); 
            }
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response) {
                setError(error.response.data)
            }
        }
    }

    return (
        <div className='repartidor-reg'>
            <form className='repartidor-reg__card' onSubmit={Registrarse}> 
                <div className='repartidor-reg__header'>
                    <h1>Crea tu cuenta</h1>
                    <p>Reparte tus comidas favoritas en segundos</p>
                </div>

                <div className='repartidor-reg__fields'>
                    <input type="text" value={nombre} placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}required/>
                    <input type="text" value={apellido} placeholder='Apellido' onChange={(e) => setApellido(e.target.value)}required/>
                    <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}required/>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                        <option value="">Selecciona genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <input type="tel" pattern="\+?[0-9]{8,15}" placeholder="+5491122334455" value={telefono} onChange={(e) => setTelefono(e.target.value)}required/>
                    <input type="password" value={contraseña} placeholder='Contraseña' onChange={(e) => setContraseña(e.target.value)}required/>
                    <input type="date" value={fecha_nacimiento} placeholder='Fecha Nacimiento' onChange={(e) => setFecha(e.target.value)}required/>
                    <select value={vehiculo} onChange={(e) => setVehiculo(e.target.value)} required>
                        <option value="">Selecciona vehículo</option>
                        <option value="Moto">Moto</option>
                        <option value="Auto">Auto</option>
                        <option value="Bicicleta">Bicicleta</option>
                    </select>
                    <select value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)} required>
                        <option value="">Selecciona nacionalidad</option>
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

                    <label className='repartidor-reg__label'>Fecha de Emisión de Licencia</label>
                    <input type="date" value={fecha_emision} onChange={(e) => setEmision(e.target.value)}required/>
                    <select value={tipo_licencia} onChange={(e) => setTipo_licencia(e.target.value)} required>
                        <option value="">Selecciona tipo de licencia</option>
                        <option value="Clase A">Clase A</option>
                        <option value="Clase B">Clase B</option>
                        <option value="Profesional">Profesional</option>
                    </select>
                </div>

                {error && <p className="repartidor-reg__error">Mensaje: {error.message || error}</p>}

                <div className='repartidor-reg__footer'>
                    <button type="submit" className='repartidor-reg__btn-submit'>ENVIAR</button>
                    <Link to='/RegisterType' className='repartidor-reg__link-back'>Volver para atrás</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterRepartidor;