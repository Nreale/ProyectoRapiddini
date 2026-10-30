import './CambiarContraseña.css' 
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CambiarContraseña() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseñaV, setContraseñaV] = useState('');
    const [paso, setPaso] = useState(1);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const SolicitarCodigo = async (e) => {
        e.preventDefault()
        setMensaje(null)
        setError(null)

        

        try {
            const response = await axios.post('http://localhost:3000/Usuario/SolicitarCodigo',{
                email
            })
            if (response?.data?.estado) {
                setPaso(2)
                setMensaje(`El codigo a sido enviado. Revise su bandeja del correo ${email}`)

            }

        } catch (error) {
            setError(error.response?.data?.message || "Error al restablecer la contraseña")
        }
    }

    const Validar = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);

        try {
            const response = await axios.patch('http://localhost:3000/Usuario/ValidarCodigo', {
                codigo_recuperacion: codigo,
                email
            })

            if (response?.data?.estado) {
                setPaso(3)
                setMensaje('Permiso concedido. Ingrese su nueva contraseña')
                

            }
        } catch (error) {
            setError(error.response?.data?.message || "Error al restablecer la contraseña")
        }
    }

    const Cambiar = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        try {
            if (contraseña !== contraseñaV) {
                return setError("Las contraseñas no coinciden")
            }
            const response = await axios.patch('http://localhost:3000/Usuario/Cambiar', {
                contraseña,
                email
            })

            if (response?.data?.estado) {
                setMensaje('Contraseña cambiada con exito, Volviendo al Inicio')
                setTimeout(()=>{
                    navigate('/')
                }, 3000)
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error al restablecer la contraseña");
        }
    }

  return (
    <>
    <div className='password__page'>
        <div className='password__card'>
            <div className='password__logo'>
                <h1>Rapiddini Deliverini</h1>
            </div>
            <div className='password__card-right'>
                <div className='password__link'>
                <div className='password__link--icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="14px" width="14px" fill="#212529"><path d="M10,22L0,12L10,2l1.78,1.77L3.55,12l8.23,8.23L10,22Z"/></svg>
                </div>
                <Link to='/'>Regresar</Link>
            </div>
            <div className='password__text'>
                <h1>¡Oops! ¿Olvidaste tu contraseña?</h1>
                <span>
                    {paso === 1 && "Por favor, introduce tu dirección de correo electrónico y te enviaremos un código."}
                    {paso === 2 && `Introduce el código de 6 dígitos que enviamos a ${email}.`}
                    {paso === 3 && "Ingresa y confirma tu nueva contraseña."}
                </span>
            </div>
            {paso === 1 && 
                <form onSubmit={SolicitarCodigo} className='password__form'>

                    <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                    <button type='submit'>Continuar</button>
                </form>
            }
            {paso === 2 &&
                <form onSubmit={Validar} className='password__form'>

                    <input  type="text" id="codigo-verificacion" className="codigo-input" placeholder="------" maxLength="6" inputMode="numeric" value={codigo} onChange={(e) => setCodigo(e.target.value)} required/>
                    <button type='submit'>Continuar</button>
                </form>
            }
            {paso === 3 && 
                <form onSubmit={Cambiar} className='password__form'>
                    
                    <input type="password" value={contraseña} placeholder='Nueva contraseña' onChange={(e) => setContraseña(e.target.value)} required/>
                    <input type="password" value={contraseñaV} placeholder='Confirmar contraseña' onChange={(e) => setContraseñaV(e.target.value)} required/>    
                    <button type='submit'>Restablecer contraseña</button>
                </form>
            }
            
            
            <br />
            {mensaje && <p className='configuracion__msg--success'>{mensaje}</p>}
            {error && <p className='configuracion__msg--error'>{error}</p>}
            </div>    
        </div>
    </div>
    </>
  )
}

export default CambiarContraseña