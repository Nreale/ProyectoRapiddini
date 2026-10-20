import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import './RegisterUser.css'

function RegisterUser() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [fecha_nacimiento, setFecha] = useState("")
    const [genero, setGenero] = useState("")
    const [error, setError] = useState(null)

    const Registrarse = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const response = await axios.post("http://localhost:3000/Usuario/Registrarte", {
                nombre,
                apellido,
                email,
                telefono,
                contraseña,
                fecha_nacimiento,
                genero,
            });

            if (response.status === 201) {
                navigate('/Login'); 
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                const mensajeError = error.response.data.message || "Error al registrarse";
                setError(mensajeError);
            }
        }
    };

    return (
        <div className='user-reg'>
            <form className='user-reg__card' onSubmit={Registrarse}> 
                <div className='user-reg__header'>
                    <h1>Crea tu cuenta</h1>
                    <p>Pedí tus comidas favoritas en segundos</p>
                </div>

                <div className='user-reg__fields'>
                    <input type="text" value={nombre} placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} required/>
                    <input type="text" value={apellido} placeholder='Apellido' onChange={(e) => setApellido(e.target.value)} required/>
                    <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                        <option value="">Selecciona genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <input type="tel" pattern="\+?[0-9]{8,15}" placeholder="+5491122334455" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                    <input type="password" value={contraseña} placeholder='Contraseña' onChange={(e) => setContraseña(e.target.value)} required/>
                    <input type="date" value={fecha_nacimiento} placeholder='Fecha Nacimiento' onChange={(e) => setFecha(e.target.value)} required />
                </div>

                {error && <p className="user-reg__error">Mensaje: {error.message || error}</p>}

                <div className='user-reg__footer'>
                    <button type="submit" className='user-reg__btn-submit'>ENVIAR</button>
                    <Link to='/RegisterType' className='user-reg__link-back'>Volver para atrás</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser;