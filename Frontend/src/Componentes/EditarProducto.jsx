const EditarProducto = ({ producto, setProducto, categorias, onSubmit, onCerrar }) => {
    return (
        <div className="modal-editar-producto">
            <div className="modal-content">
                <h3>Editar Producto: {producto.nombreOriginal}</h3>
                <form onSubmit={onSubmit}>
                    <label>Nombre:</label>
                    <input type="text" placeholder={producto.nombreOriginal} value={producto.nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} />

                    <label>Descripción:</label>
                    <textarea placeholder={producto.descripcionOriginal} value={producto.descripcion} onChange={(e) => setProducto({...producto, descripcion: e.target.value})} />

                    <label>Precio:</label>
                    <input type="number" min="0" placeholder={producto.precioOriginal} value={producto.precio} onChange={(e) => setProducto({...producto, precio: e.target.value})} />

                    <label>Categoría:</label>
                    <select value={producto.Id_Categoria} onChange={(e) => setProducto({...producto, Id_Categoria: e.target.value})}>
                        <option value="">Seleccione una categoría (o mantenga la actual)</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>

                    <label>URL de Imagen:</label>
                    <input type="text" placeholder={producto.imagenOriginal} value={producto.imagen} onChange={(e) => setProducto({...producto, imagen: e.target.value})} />

                    <label>Stock:</label>
                    <input type="number" min="0" placeholder={producto.stockOriginal} value={producto.stock} onChange={(e) => setProducto({...producto, stock: e.target.value})} />

                    <div className="modal-actions">
                        <button type="submit" className="btn-guardar">Actualizar</button>
                        <button type="button" className="btn-cancelar" onClick={onCerrar}>Descartar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProducto;