import { useState, useEffect } from 'react'
import './Carrito.css'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

function Carrito() {
    const [carrito, setCarrito] = useState(null)
    useEffect(()=>{
        const obtenerCarrito = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:3000/Pedidos/Carrito', {
                    headers: { 'authorization': token }
                });
                
                setCarrito(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };
        obtenerCarrito();
    }, [])

    if (!carrito || !carrito.Carritos || carrito.Carritos.length === 0) {
        return (
            <div>
                <div>
                    <h2>Tu carrito se encuentra vacio</h2>
                    <p>puedes agregar productos desde el menu principal</p>
                </div>
                <div>
                    <Link className='login__buttons--decoration' to='/'> 
                        <button>Volver</button>
                    </Link>
                </div>
            </div>
            
        );
    }
    
    return (
        <div className="carrito-container">
            <h2>Mi Carrito</h2>
            {/* Recorremos la tabla intermedia para pintar las tarjetas */}
            <div className="carrito-items">
                {carrito.Carritos.map((item) => (
                    <div key={item.id} className="tarjeta-item">
                        <h4>{item.Producto?.nombre}</h4>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio: ${item.Producto?.precio}</p>
                    </div>
                ))}
            </div>
            <h3>Total: ${carrito.total}</h3>
            <button>Finalizar Compra</button>
        </div>
    );
};
export default Carrito;