const ListaSucursales = ({ sucursales }) => {
    return (
        <div className="vendedor-card vendedor-card--sucursales">
            <div className="vendedor-card__header">
                <h3>Sucursales</h3>
            </div>
            <div className="vendedor-sucursales__list">
                {sucursales && sucursales.length > 0 ? (
                    sucursales.map((sucursal) => (
                        <div key={sucursal.id} className="sucursal-item">
                            <div className="sucursal-item__info">
                                <h4>{sucursal.nombre}</h4>
                                <p>{sucursal.direccion}</p>
                            </div>
                            <span className={`sucursal-item__status ${sucursal.isActive ? 'abierta' : 'cerrada'}`}>
                                {sucursal.isActive ? 'Abierta' : 'Cerrada'}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="vendedor-empty-text">Sin sucursales registradas.</p>
                )}
            </div>
        </div>
    );
};

export default ListaSucursales;