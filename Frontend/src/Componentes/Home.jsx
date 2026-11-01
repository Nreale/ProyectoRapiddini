import React, { useState } from "react";
import { useEffect } from 'react'
import axios from "axios";
import "./Home.css";
import HomeUsuario from "./HomeUsuarios";
import HomeVendedor from "./HomeVendedores";
import HomeInvitado from "./HomeInvitado";
import HomeRepartidor from "./HomeRepartidores";



const Home = () => {
    const [error, setError] = useState(null)
    const [Usuario, setUsuario] = useState(null)
    const [Vista, setVista] = useState(1)


    const BuscarUsuario = async (e) => {
        setError(null);
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setVista(1)
                return
            }
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
        BuscarUsuario()
    },[])


    useEffect(() => {
        if (Usuario && Usuario.Roles) {
            if (Usuario.Roles.some(rol => rol.nombre === 'USUARIO')) {
                setVista(2);
            }  
            if (Usuario.Roles.some(rol => rol.nombre === 'VENDEDOR')) {
                setVista(3);
            } 
            if (Usuario.Roles.some(rol => rol.nombre === 'REPARTIDOR')) {
                setVista(4);
            }
        }
    }, [Usuario]);
    
    
    
    return (
        <>
        {Vista === 1 && <>
            <HomeInvitado/>
        </>}
        {Vista === 2 && <>
            <HomeUsuario/>
        </>}
        {Vista === 3 && <>
            <HomeVendedor/>
        </>}
        {Vista === 4 && <>
            <HomeRepartidor/>
        </>}
        </>
        
    );
};

export default Home;