import React from "react";
import Carrusel from "./Carrusel";
import CategoriasSection from "./CategoriasSection";
import "./Home.css";

const localesPrecargados = [
    { id_local: 1, nombre: 'Sucursal Centro', telefono: '1123456789', estado: true },
    { id_local: 2, nombre: 'Local Norte', telefono: '1198765432', estado: true },
    { id_local: 3, nombre: 'Punto Sur', telefono: '1144556677', estado: false },
    { id_local: 4, nombre: 'Local Oeste', telefono: '1133221100', estado: true },
    { id_local: 5, nombre: 'Express Belgrano', telefono: '1155443322', estado: true },
    { id_local: 6, nombre: 'Sucursal Palermo', telefono: '1166778899', estado: true },
    { id_local: 7, nombre: 'Local San Isidro', telefono: '1177889900', estado: false },
    { id_local: 8, nombre: 'Punto Recoleta', telefono: '1188990011', estado: true },
    { id_local: 9, nombre: 'Express Caballito', telefono: '1199001122', estado: true },
    { id_local: 10, nombre: 'Local Ramos Mejía', telefono: '1100112233', estado: false }
];

const Home = () => {
    const localesArriba = localesPrecargados.slice(0, 5);
    const localesAbajo = localesPrecargados.slice(5, 10);

    return (
        <div className="home__section">
            <Carrusel 
                titulo="Destacados de la Semana" 
                locales={localesArriba} 
            />
            
            <div className="home__section">
              <CategoriasSection />
            </div>

            <Carrusel 
                titulo="Otras Sucursales" 
                locales={localesAbajo} 
            />
        </div>
    );
};

export default Home;