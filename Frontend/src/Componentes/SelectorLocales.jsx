const SelectorLocales = ({ locales, localSeleccionado, setLocalSeleccionado }) => {
    return (
        <section className="home-vendedor__section">
            <h2>ELIJE TU LOCAL</h2>
            <div className="home-vendedor__line"></div>
            <div className="home-vendedor__icons-local">
                {locales.length > 0 ? (
                    locales.map((local) => (
                        <div key={local.id} className={`local-icono-item ${localSeleccionado?.id === local.id ? 'activo' : ''}`} onClick={() => setLocalSeleccionado(local)}>
                            <div className="local-icono-img-container">
                                <img src={local.imagen || "https://via.placeholder.com/60"} alt={local.nombre} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="home-vendedor__sin-locales">No tienes locales registrados.</p>
                )}
            </div>
        </section>
    );
};

export default SelectorLocales;