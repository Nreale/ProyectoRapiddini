import './CambiarContraseña.css' // 👈 Asegúrate de que tu archivo CSS se llame exactamente así
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CambiarContraseña() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const RecuperarContraseña = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);

        if (nuevaPassword !== confirmarPassword) {
            return setError("Las contraseñas no coinciden");
        }

        try {
            const response = await axios.post('http://localhost:3000/Usuario/ModificarCuenta', {
                contraseña
            })

            if (response.data.estado) {
                setMensaje("Contraseña restablecida con éxito! Redirigiendo al login");
                setTimeout(() => {
                    navigate('/Login')
                }, 3000)
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error al restablecer la contraseña");
        }
    }

  return (
    <>
    <div className="cambiar-pass__container">
            <div className="cambiar-pass__card">
                <div className="cambiar-pass__header">
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingresá tu correo electrónico y tu nueva contraseña.</p>
                </div>

                <form onSubmit={RecuperarContraseña} className="cambiar-pass__form">
                    <div className="cambiar-pass__fields">
                        <input type="email" placeholder="Correo electrónico" value={email}onChange={(e) => setEmail(e.target.value)}required />
                        <input type="password" placeholder="Nueva contraseña" value={nuevaPassword}onChange={(e) => setNuevaPassword(e.target.value)}required />
                        <input type="password" placeholder="Confirmar nueva contraseña" value={confirmarPassword}onChange={(e) => setConfirmarPassword(e.target.value)}required />
                    </div>

                    {mensaje && <p className="cambiar-pass__msg--success">{mensaje}</p>}
                    {error && <p className="cambiar-pass__msg--error">{error}</p>}

                    <div className="cambiar-pass__buttons">
                        <button type="submit" className="cambiar-pass__button cambiar-pass__button--save"> Restablecer</button>
                        <Link to="/Login" className="cambiar-pass__button cambiar-pass__button--volver cambiar-pass__buttons--decoration">Volver al Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarContraseña