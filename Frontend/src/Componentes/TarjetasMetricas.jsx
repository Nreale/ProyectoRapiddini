const TarjetaMetricas = ({ localSeleccionado }) => {
    return (
        <div className="vendedor-card vendedor-card--stats">
            <div className="vendedor-card__header">
                <h3>Métricas & Información - {localSeleccionado.nombre}</h3>
            </div>
            <div className="vendedor-table-container">
                <table className="vendedor-table">
                    <thead>
                        <tr>
                            <th>Métrica</th>
                            <th>Valor del Mes</th>
                            <th>Estado Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td><strong>Pedidos Totales</strong></td>
                            <td>{localSeleccionado.ventasMes || 0} envíos</td>
                            <td><span className="badge badge--success">Activo</span></td>
                        </tr>
                        <tr>
                            <td><strong>Ingresos Brutos</strong></td>
                            <td>${localSeleccionado.ingresos || 0}</td>
                            <td><span className="badge badge--success">Facturación</span></td>
                        </tr>
                        <tr>
                            <td><strong>Teléfono Oficial</strong></td>
                            <td>{localSeleccionado.telefono}</td>
                            <td>
                                <span className={`badge ${localSeleccionado.estado ? 'badge--success' : 'badge--danger'}`}>
                                    {localSeleccionado.estado ? 'Abierto' : 'Cerrado'}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TarjetaMetricas;