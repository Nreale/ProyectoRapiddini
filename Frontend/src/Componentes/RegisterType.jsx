import { useState } from 'react'
import {Link} from 'react-router-dom'
import './RegisterType.css'
import estrellas from '../assets/estrellas.png'; 
import { useLocation } from 'react-router-dom';

function RegisterType() {
  return (
    <>
        <div className='registertype'>
            <div className='registertype__menu'>
              <div className='registertype__menu--users'>
                <img src={estrellas} alt="" />
                <p>+1000000 De Usuarios Activos</p>
              </div>
              <div className='registertype__menu--title'>
                <h1>Forma parte de nuestra comunidad.</h1>
              </div>
              
              
              <div className='registertype__menu--parrafo'>
                <p>Llevamos tus antojos y compras del día directo a tu puerta en minutos! Disfruta del servicio más rápido, cómodo y confiable con las mejores tiendas de la ciudad al alcance de tu mano</p>
              </div>
              <br />
              <div className='registertype__menu--button'>
                  <Link id='decoration--none' to='/RegisterUser'>
                    <button>Usuario</button>
                  </Link>
                  <Link id='decoration--none' to='/RegisterVendedor'>
                      <button>Vendedor</button>
                  </Link>
                  <Link id='decoration--none' to='/RegisterRepartidor'> 
                      <button>Repartidor</button>
                  </Link>
              </div>
              <div className='registertype__menu--Link'>
                <Link to='/'>Volver para atras</Link>
              </div>
              
            </div>
            <div className='registertype__imagen'> 
                
            </div>
        </div>
    </>
  )
}

export default RegisterType