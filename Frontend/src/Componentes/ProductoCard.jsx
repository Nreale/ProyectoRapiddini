import react, {useState} from "react";
import "./ProductoCard.css";

function ProductoCard ({producto, onAgregarAlCarrito}) {
    const [Cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(prev => prev+1);
    const decrementar = () => setCantidad(prev => (prev > 1 ? prev -1 : 1))

    return (
    <div className="producto--card">
      <img src={producto.imagen || "https://via.placeholder.com/150"} alt={producto.nombre} />
      
      <div className="producto--card__datos">
        <h3>{producto.nombre}</h3>
        {/* Mostramos la categoría y el local */}
        <p className="categoria">Categoría: {producto.Categoria?.nombre || producto.categoria || "Sin categoría"}</p>
        <p className="local">Local: {producto.Locale?.nombre || producto.local || "Sin local"}</p>
  
        <p className="descripcion">{producto.descripcion}</p>
        <span>${producto.precio}</span>
      </div>

      <div className="producto--card__funcionalidades">
        <div className="producto--card__modifCantidad">
          <button onClick={() => decrementar()}>-</button>
          <span>{Cantidad}</span>
          <button onClick={() => incrementar()}>+</button>
        </div>
        
        <button 
          className="producto-card__btn" 
          onClick={() => onAgregarAlCarrito(producto, Cantidad)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );

}

export default ProductoCard;