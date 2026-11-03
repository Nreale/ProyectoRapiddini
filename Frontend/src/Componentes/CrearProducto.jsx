const CrearProducto = ({ form, setForm, categorias, onSubmit, onCerrar }) => {
    return (
        <div className="modal-editar-producto">
            <div className="modal-content">
                <h3>Agregar Nuevo Producto</h3>
                <form onSubmit={onSubmit}>
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre del producto" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required/>

                    <label>Descripción:</label>
                    <textarea placeholder="Descripción del producto" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} required/>

                    <label>Precio:</label>
                    <input type="number" min="0" placeholder="Precio" value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} required/>

                    <label>Categoría:</label>
                    <select value={form.Id_Categoria} onChange={(e) => setForm({...form, Id_Categoria: e.target.value})}required>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>

                    <label>URL de Imagen:</label>
                    <input type="text" placeholder="https://..." value={form.imagen} onChange={(e) => setForm({...form, imagen: e.target.value})} />

                    <label>Stock:</label>
                    <input type="number" min="0" placeholder="Stock inicial" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} required/>

                    <div className="modal-actions">
                        <button type="submit" className="btn-guardar">Crear Producto</button>
                        <button type="button" className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearProducto;