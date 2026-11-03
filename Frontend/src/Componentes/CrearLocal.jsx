import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import './CrearLocal.css'

function CrearLocal() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [imagen, setImagen] = useState(null)
    const [logo, setLogo] = useState(null)
    const [error, setError] = useState(null)

    const GuardarLocal = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            formData.append("telefono", telefono);
            
            if (imagen) {
                formData.append("imagen", imagen);
            }
            if (logo) {
                formData.append("logo", logo);
            }

            const token = localStorage.getItem('token');

            const response = await axios.post("http://localhost:3000/Locales/AgregarLocal", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                }
            });

            if (response.status === 201 || response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                const mensajeError = error.response.data.message || "Error al crear el local";
                setError(mensajeError);
            } else {
                setError("Error de conexión con el servidor");
            }
        }
    };

    return (
        <div className='crear-local'>
            <form className='crear-local__card' onSubmit={GuardarLocal}> 
                <div className='crear-local__header'>
                    <h1>Crea tu Local</h1>
                    <p>Registra tu negocio y empieza a vender</p>
                </div>

                <div className='crear-local__fields'>
                    <input 
                        type="text" 
                        value={nombre} 
                        placeholder='Nombre del local' 
                        onChange={(e) => setNombre(e.target.value)} 
                        required
                    />
                    
                    <textarea 
                        value={descripcion} 
                        placeholder='Descripción del local' 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        rows="3"
                    />

                    <input 
                        type="tel" 
                        placeholder='Teléfono de contacto' 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                    />

                    <div className='crear-local__file-group'>
                        <label>Logo del Local (Insignia):</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setLogo(e.target.files[0])} 
                        />
                    </div>

                    <div className='crear-local__file-group'>
                        <label>Foto Principal de Portada:</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setImagen(e.target.files[0])} 
                        />
                    </div>
                </div>

                {error && <p className="crear-local__error">Mensaje: {error}</p>}

                <div className='crear-local__footer'>
                    <button type="submit" className='crear-local__btn-submit'>CREAR LOCAL</button>
                    <Link to='/home' className='crear-local__link-back'>Volver al inicio</Link>
                </div>
            </form>
        </div>
    )
}

export default CrearLocal;