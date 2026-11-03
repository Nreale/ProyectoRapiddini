const ModificarLocal = ({ local, setLocal, onSubmit, onBorrar, onCerrar }) => {
    return (
        <div className="modal-editar-producto">
            <div className="modal-content">
                <h3>Editar Local: {local.nombre}</h3>
                <form onSubmit={onSubmit}>
                    <label>Nombre:</label>
                    <input type="text" value={local.nombre} onChange={(e) => setLocal({...local, nombre: e.target.value})} required />

                    <label>Teléfono:</label>
                    <input type="text" value={local.telefono} onChange={(e) => setLocal({...local, telefono: e.target.value})} required />

                    <label>Estado (true/false):</label>
                    <select value={local.estado} onChange={(e) => setLocal({...local, estado: e.target.value === "true"})}>
                        <option value="true">Activo / Abierto</option>
                        <option value="false">Inactivo / Cerrado</option>
                    </select>

                    <label>URL Imagen:</label>
                    <input type="text" value={local.imagen || ""} onChange={(e) => setLocal({...local, imagen: e.target.value})} />

                    <div className="modal-actions-between">
                        <div className="modal-actions-group">
                            <button type="submit" className="btn-guardar">Actualizar</button>
                            <button type="button" className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
                        </div>
                        <button type="button" className="btn-danger-local"onClick={() => onBorrar(local.id)}>Borrar Local</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarLocal;