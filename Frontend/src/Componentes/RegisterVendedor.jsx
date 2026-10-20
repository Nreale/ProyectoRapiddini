import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './RegisterVendedor.css'

function RegisterVendedor() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [fecha_nacimiento, setFecha] = useState("")
    const [genero, setGenero] = useState("")
    const [CUIT, setCuit] = useState("")
    const [Razon_Social, setRazon_social] = useState("")
    const [error, setError] = useState(null)

    const Registrarse = async (e) => {
        e.preventDefault();
        try {
            setError(null)
            const response = await axios.post("http://localhost:3000/Vendedor/Registrarte", {
                CUIT,
                Razon_Social,
                nombre,
                apellido,
                email,
                telefono,
                contraseña,
                fecha_nacimiento,
                genero
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
        <div className='vendedor-reg'>
            <form className='vendedor-reg__card' onSubmit={Registrarse}> 
                <div className='vendedor-reg__header'>
                    <h1>Crea tu cuenta</h1>
                    <p>Vende tus productos en nuestra plataforma</p>
                </div>

                <div className='vendedor-reg__fields'>
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
                    <input type="text" value={CUIT} placeholder='CUIT' onChange={(e) => setCuit(e.target.value)}required/>
                    <input type="text" value={Razon_Social} placeholder='Razón Social' onChange={(e) => setRazon_social(e.target.value)}required/>
                </div>

                {error && <p className="vendedor-reg__error">Mensaje: {error.message || error}</p>}

                <div className='vendedor-reg__footer'>
                    <button type="submit" className='vendedor-reg__btn-submit'>ENVIAR</button>
                    <Link to='/RegisterType' className='vendedor-reg__link-back'>Volver para atrás</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterVendedor;