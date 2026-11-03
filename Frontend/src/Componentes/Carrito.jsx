import { useState, useEffect } from 'react'
import './Carrito.css'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

function Carrito() {
    const [carrito, setCarrito] = useState(null)

    const navigate = useNavigate()

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

    const VaciarCarrito = async () => {
        try {
            const idPedidoActivo = carrito.id;
            console.log(carrito)

            await axios.delete(`http://localhost:3000/Carrito/Vaciar/${idPedidoActivo}`);

            await axios.put(`http://localhost:3000/Pedidos/${idPedidoActivo}/estado`, {
                total: 0
            });

            setCarrito(null);
            alert("El carrito ha sido vaciado.");
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            alert("Hubo un error al vaciar el carrito.");
        }
    };

    const CompletarPedido = async () => {
        const idPedidoActivo = carrito.id;

        await axios.put(`http://localhost:3000/Pedidos/${idPedidoActivo}/estado`, {
            estado: "EsperandoRepartidor"
        });
        await axios.post('http://localhost:3000/Pedidos/', {
            id_usuario: carrito.Id_Usuario
        })

        alert('Su pedido esta a la espera de un repartidor, puede realizar otro a continuacion')
        navigate('/')
    }

    if (!carrito || !carrito.Carritos || carrito.Carritos.length === 0) {
        return (
            <div className="carrito-vacio-container">
                <div className="carrito-vacio-card">
                    <div className="carrito-vacio-texto">
                        <h2>Tu carrito se encuentra vacío</h2>
                        <p>Puedes agregar productos desde el menú principal</p>
                    </div>
                    <div className="carrito-vacio-accion">
                        <Link className='login__buttons--decoration' to='/'> 
                            <button className="btn-volver">Volver al menú</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="carrito-container">
            <h2>Mi Carrito</h2>
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
            <div className="carrito-acciones">
                <Link to='/'>
                    <button className="btn-finalizar">Volver al menú</button>
                </Link>

                <button className="btn-finalizar" onClick={VaciarCarrito}>
                    Vaciar Carrito
                </button>

                <button className="btn-finalizar" onClick={CompletarPedido}>Finalizar Compra</button>
            </div>
        </div>
    );
};

export default Carrito;