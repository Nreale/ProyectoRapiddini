import React from "react";

const CrearLocal = ({ form, setForm, onSubmit, onCerrar }) => {
    return (
        <div className="modal-editar-producto">
            <div className="modal-content">
                <h3>Crear Nuevo Local</h3>
                <form onSubmit={onSubmit}>
                    <label>Nombre:</label>
                    <input type="text" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required />
                    <label>Teléfono:</label>
                    <input type="tel" pattern="\+?[0-9]{8,15}" placeholder="+5491122334455" value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} required/>
                    <label>Dirección:</label>
                    <input type="text" value={form.direccion} onChange={(e) => setForm({...form, direccion: e.target.value})} required />

                    <label>URL Imagen:</label>
                    <input type="text" value={form.imagen} onChange={(e) => setForm({...form, imagen: e.target.value})} />

                    <div className="modal-actions">
                        <button type="submit" className="btn-guardar">Guardar</button>
                        <button type="button" className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearLocal;