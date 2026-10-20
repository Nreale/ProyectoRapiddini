import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Configuracion.css';
import axios from 'axios';

function Configuracion() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='configuracion__container'>
            <div className='configuracion__card'>
                <div className='configuracion__header'>
                    <h2>Mi Perfil</h2>
                    <p>Administrá tu sesión y datos personales.</p>
                </div>

                <div className='configuracion__buttons'>
                    <button onClick={handleLogout} className='configuracion__button configuracion__button--logout'>
                        Cerrar Sesión
                    </button>

                    <Link className='configuracion__buttons--decoration' to='/'>
                        <button className='configuracion__button configuracion__button--volver'>Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Configuracion;