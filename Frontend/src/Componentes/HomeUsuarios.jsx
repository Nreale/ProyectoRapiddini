import React, { useState } from "react";
import { useEffect } from 'react'
import axios from "axios";
import Carrusel from "./Carrusel";
import CategoriasSection from "./CategoriasSection";
import "./Home.css";
import ProductosCards from "./ProductosCards";


const HomeUsuario = () => {

    const [locales, setLocales] = useState([])
    const [error, setError] = useState(null)
    const [localesArriba, setlocalesArriba] = useState([])
    const [localesAbajo, setlocalesAbajo] = useState([])
    const [Usuario, setUsuario] = useState(null)


    const BuscarLocales = async (e) => {
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/Locales/ObtenerLocales')
            
            
            setLocales(response.data.locales.slice(0, 10));
            
            const mitad = Math.floor(locales.length / 2);

            setlocalesArriba(locales.slice(0, mitad));
            setlocalesAbajo(locales.slice(mitad, locales.length));


        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                const mensajeError = error.response.data.message || "Error al registrarse";
                setError(mensajeError);
            }
        }
    }

    const BuscarUsuario = async (e) => {
        setError(null);
        try {
            const token = localStorage.getItem('token') 

            const response = await axios.get('http://localhost:3000/Usuario/BuscarUsuario', {
                headers: {
                    authorization: token
                }
            })

            if (response?.data?.usuario) {
                setUsuario(response.data.usuario)
                console.log(response.data.usuario)
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                const mensajeError = error.response.data.message || "Error al registrarse";
                setError(mensajeError);
            }
        }
    }

    useEffect(()=>{
        BuscarLocales()
    },[])

    
    
    
    return (
        <>
            <div className="home__section">
                
                <Carrusel 
                    titulo="Destacados de la Semana" 
                    locales={localesArriba} 
                />
                <br /><br /><br /><br /> 
                <div className="home__section">
                    
                <CategoriasSection />
                </div>
                <br /><br /><br /><br />
                <Carrusel 
                    titulo="Otras Sucursales" 
                    locales={localesAbajo} 
                />

                <br /><br />
                <ProductosCards />
            </div>
        </>
        
    );
};

export default HomeUsuario;