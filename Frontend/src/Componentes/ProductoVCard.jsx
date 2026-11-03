const ProductoCard = ({ prod, onEditar, onBorrar }) => {
    return (
        <div className="producto-card-rect">
            <div className="producto-card-rect__info">
                <h4>{prod.nombre}</h4>
                <div className="producto-card-rect__details">
                    <span className="price">${prod.precio}</span>
                    <span className="stock">Stock: {prod.stock || 0} un.</span>
                </div>
            </div>
            <div className="producto-card-rect__actions">
                <button className="btn-action btn-action--edit" onClick={() => onEditar(prod)}>Editar</button>
                <button className={`btn-action ${prod.isActive ? 'btn-action--pause' : 'btn-action--enable'}`} onClick={() => onBorrar(prod.id)}>{prod.isActive ? 'Desactivar' : 'Activar'}</button>
            </div>
        </div>
    );
};

export default ProductoCard;