import react, {useState} from "react";
import "./ProductoCard.css";

function ProductoCard ({producto, onAgregarAlCarrito}) {
    const [Cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(prev => prev+1);
    const decrementar = () => setCantidad(prev => (prev > 1 ? prev -1 : 1))

    return(
        <div className="producto--card">
            {producto.imagen && (
                <img src={producto.imagen} alt={producto.nombre} className="producto--card__imagen"/>
            )}
            
            <div className="producto--card__datos">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <span>${producto.precio}</span>
            </div>
            
            <div className="producto--card__funcionalidades">
                <div className="producto--card__modifCantidad">
                    <button onClick={decrementar}>-</button>
                    <span>{Cantidad}</span>
                    <button onClick={incrementar}>+</button>
                </div>

                <button className="producto-card__btn" onClick={() => onAgregarAlCarrito(producto, Cantidad)}>
                    Agregar al carrito
                </button>
            </div>


        </div>
    )

}

export default ProductoCard;