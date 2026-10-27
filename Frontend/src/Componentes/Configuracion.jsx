import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Configuracion.css';

function Configuracion() {
    const navigate = useNavigate();

    const [vistaActiva, setVistaActiva] = useState('sesion');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const BuscarUsuario = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/Usuario/BuscarUsuario', {
                headers: { 
                    authorization: token 
                }
            });
            
            const user = response.data;
            setNombre(user.nombre || '');
            setApellido(user.apellido || '');
            setEmail(user.email || '');
            setTelefono(user.telefono || '');
            setFechaNacimiento(user.fecha_nacimiento || '');
            setGenero(user.genero || '');
            console.log(response.data)

        } catch (error) {
            console.error("Error al cargar datos del usuario", error);
        }
    };

    useEffect(() => {
        BuscarUsuario();
    }, []); 

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const Borrar = async(e)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:3000/Usuario/EliminarCuenta', {
                headers: {
                    authorization: token
                }
            })
            
            
            localStorage.removeItem('token');
            navigate('/RegisterType');
        } catch (error) {
            setError(error.response?.data?.message || "Error al actualizar los datos");
        }
    }
    const ModificarUsuario = async (e) => {
        e.preventDefault();//pa que no se refresque solo
        setMensaje(null);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch('http://localhost:3000/Usuario/ModificarCuenta', {
                nombre,
                apellido,
                email,
                telefono,
                fecha_nacimiento: fechaNacimiento,
                genero
            }, {
                headers: { 
                    authorization: token 
                }
            });

            if (response.data.estado) {
                setMensaje("Datos modificados correctamente");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error al actualizar los datos");
        }
    };

    return (
        <div className='configuracion__container'>
            <div className='configuracion__card'>
                <div className='configuracion__header'>
                    <h2>Mi Perfil</h2>
                    <p>Administrá tu sesión y datos personales.</p>
                </div>


                <div className='configuracion__tabs'>
                    <button className={`configuracion__tab-btn ${vistaActiva === 'sesion' ? 'active' : ''}`} onClick={() => { setVistaActiva('sesion'); setMensaje(null); setError(null); }}> Mi Sesión</button>
                    <button className={`configuracion__tab-btn ${vistaActiva === 'modificar' ? 'active' : ''}`} onClick={() => { setVistaActiva('modificar'); setMensaje(null); setError(null); }}> Modificar Datos</button>
                </div>

                {vistaActiva === 'sesion' && (
                    <div className='configuracion__buttons'>
                        <button onClick={Logout} className='configuracion__button configuracion__button--logout'>Cerrar Sesión</button>
                        <button onClick={Borrar} className='configuracion__button configuracion__button--logout'>Borrar</button>
                        <Link className='configuracion__buttons--decoration' to='/'>
                            <button className='configuracion__button configuracion__button--volver'>Volver</button>
                        </Link>
                    </div>
                )}


                {vistaActiva === 'modificar' && (
                <form onSubmit={ModificarUsuario} className='configuracion__form'>
                    <div className='configuracion__fields'>
                        <input type="text" placeholder={nombre || 'Nombre'} onChange={(e) => setNombre(e.target.value)} />
                        <input type="text" placeholder={apellido || 'Apellido'} onChange={(e) => setApellido(e.target.value)} />
                        <input type="email" placeholder={email || 'Email'} onChange={(e) => setEmail(e.target.value)} />
                        
                        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                            <option value="">{genero || 'Selecciona género'}</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <input type="tel" placeholder={telefono || 'Teléfono'} onChange={(e) => setTelefono(e.target.value)} />
                        <input type="date" placeholder={fechaNacimiento || 'Fecha de Nacimiento'} value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                    </div>

                    {mensaje && <p className='configuracion__msg--success'>{mensaje}</p>}
                    {error && <p className='configuracion__msg--error'>{error}</p>}

                    <div className='configuracion__buttons'>
                        <button type="submit" className='configuracion__button configuracion__button--save'>Guardar Cambios</button>
                        <button type="button" onClick={() => setVistaActiva('sesion')} className='configuracion__button configuracion__button--volver'> Cancelar</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}

export default Configuracion;