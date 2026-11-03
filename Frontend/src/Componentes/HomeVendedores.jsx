import { useState, useEffect } from "react";
import axios from "axios";
import "./HomeVendedor.css";

import SelectorLocales from "./SelectorLocales"
import TarjetaMetricas from "./TarjetasMetricas"
import ListaSucursales from "./ListaSucursales"
import ProductoCard from "./ProductoVCard"
import EditarProducto from "./EditarProducto"
import CrearProducto from "./CrearProducto"
import CrearLocal from "./CrearLocal"
import ModificarLocal from "./ModificarLocal"

const HomeVendedor = () => {
    const [error, setError] = useState(null)
    const [categorias, setCategorias] = useState([])
    const [locales, setLocales] = useState([])
    const [localSeleccionado, setLocalSeleccionado] = useState(null)
    const [producto, setProducto] = useState(null)
    const [creandoProducto, setCreandoProducto] = useState(false)
    const [formNuevoProducto, setFormNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        Id_Categoria: "",
        imagen: "",
        stock: ""
    })
    const [creandoLocal, setCreandoLocal] = useState(false)
    const [formNuevoLocal, setFormNuevoLocal] = useState({ 
        nombre: "", 
        telefono: "", 
        estado: true, 
        imagen: "" 
    })
    const [editandoLocal, setEditandoLocal] = useState(null)

    const BuscarLocalesConEstadisticas = async () => {
        setError(null)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await axios.get('http://localhost:3000/Locales/ObtenerLocalesByVendedor', {
                headers: { 
                    authorization: token 
                }
            })
            
            if (response?.data?.locales) {
                const listaLocales = response.data.locales
                setLocales(listaLocales)

                if (listaLocales.length > 0) {
                    const actual = localSeleccionado ? listaLocales.find(local => local.id === localSeleccionado.id) : null;
                    setLocalSeleccionado(actual || listaLocales[0])
                } else {
                    setLocalSeleccionado(null)
                }
            }
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error al cargar los datos")
            }
        }
    }

    const ConseguirCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/Categorias/ObtenerCategorias')
            if (response?.data?.categorias) {
                setCategorias(response.data.categorias)
            }
        } catch (error) {
            console.error("Error al conseguir categorías:", error)
        }
    }

    const abrirEditorProducto = (prod) => {
        setProducto({
            id: prod.id,
            nombre: "",
            descripcion: "",
            precio: "",
            Id_Categoria: "",
            imagen: "",
            stock: "",
            nombreOriginal: prod.nombre,
            descripcionOriginal: prod.descripcion,
            precioOriginal: prod.precio,
            imagenOriginal: prod.imagen,
            stockOriginal: prod.stock
        })
        ConseguirCategorias()
    }

    const ModificarProducto = async (e) => {
        e.preventDefault()
        if (!producto) return

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            await axios.patch(`http://localhost:3000/Producto/ModificarProducto/${producto.id}`, 
                producto, 
                {
                    headers: { 
                        authorization: token 
                    }
            })

            setProducto(null)
            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error al modificar el producto")
            }
        }
    }

    const abrirModalNuevoProducto = () => {
        setCreandoProducto(true)
        setFormNuevoProducto({
            nombre: "",
            descripcion: "",
            precio: "",
            Id_Categoria: "",
            imagen: "",
            stock: ""
        })
        ConseguirCategorias()
    }

    const AgregarProducto = async (e) => {
        e.preventDefault()
        if (!localSeleccionado) return

        try {
            const token = localStorage.getItem('token')
            if (!token) return
            
            await axios.post('http://localhost:3000/Producto/AgregarProducto', {
                ...formNuevoProducto,
                Id_Local: localSeleccionado.id
            }, {
                headers: { 
                    authorization: token 
                }
            })

            setCreandoProducto(false)
            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error al agregar el producto")
            }
        }
    }

    const BorrarProducto = async (idProducto) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            
            await axios.patch(`http://localhost:3000/Producto/CambiarEstado/${idProducto}`, {}, 
                {
                headers: { 
                    authorization: token 
                }
            })

            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error en la petición:", error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error al cambiar estado del producto")
            }
        }
    }

    const AgregarLocal = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            
            await axios.post('http://localhost:3000/Locales/AgregarLocal', 
                formNuevoLocal, 
                {
                    headers: { 
                        authorization: token 
                    }
            })

            setCreandoLocal(false)
            setFormNuevoLocal({ nombre: "", telefono: "", estado: true, imagen: "" })
            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error al crear local:", error)
        }
    }

    const ActualizarLocalSubmit = async (e) => {
        e.preventDefault()
        if (!editandoLocal) return
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            
            await axios.patch(`http://localhost:3000/Locales/ModificarLocal/${editandoLocal.id}`, 
                editandoLocal, 
                {
                    headers: { 
                        authorization: token 
                    }
            })

            setEditandoLocal(null)
            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error al actualizar local:", error)
        }
    }

    const BorrarLocal = async (idLocal) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            
            await axios.delete(`http://localhost:3000/Locales/BorrarLocal/${idLocal}`, {
                headers: { authorization: token }
            })

            setEditandoLocal(null)
            setLocalSeleccionado(null)
            BuscarLocalesConEstadisticas()
        } catch (error) {
            console.error("Error al borrar local:", error)
        }
    }

    useEffect(() => {
        BuscarLocalesConEstadisticas()
    }, [])

    return (
        <div className="home-vendedor__page">
            <SelectorLocales locales={locales} localSeleccionado={localSeleccionado} setLocalSeleccionado={setLocalSeleccionado}/>

            <div className="home-vendedor__local">
                {localSeleccionado ? (
                    <div className="vendedor-dashboard">
                        
                        <div className="vendedor-card__header vendedor-local-header">
                            <h3>Gestión de Local: {localSeleccionado.nombre}</h3>
                            <div className="vendedor-local-actions">
                                <button className="btn-add-local" onClick={() => setCreandoLocal(true)}>Nuevo Local</button>
                                <button className="btn-edit-local" onClick={() => setEditandoLocal({...localSeleccionado})}>Editar Local Actual</button>
                            </div>
                        </div>

                        <div className="vendedor-dashboard__top">
                            <TarjetaMetricas localSeleccionado={localSeleccionado} />
                            <ListaSucursales sucursales={localSeleccionado.Sucursales} />
                        </div>

                        <div className="vendedor-dashboard__bottom">
                            <div className="vendedor-card__header">
                                <h3>Administración de Productos</h3>
                                <button className="btn-add-product" onClick={abrirModalNuevoProducto}>Nuevo Producto</button>
                            </div>

                            <div className="vendedor-productos__grid">
                                {localSeleccionado.Productos && localSeleccionado.Productos.length > 0 ? (
                                    localSeleccionado.Productos.map((prod) => (
                                        <ProductoCard key={prod.id} prod={prod} onEditar={abrirEditorProducto} onBorrar={BorrarProducto}/>
                                    ))
                                ) : (
                                    <p className="vendedor-empty-text">No hay productos dados de alta en este local.</p>
                                )}
                            </div>
                        </div>

                        {producto && (
                            <EditarProducto producto={producto} setProducto={setProducto} categorias={categorias} onSubmit={ModificarProducto} onCerrar={() => setProducto(null)}/>
                        )}

                        {creandoProducto && (
                            <CrearProducto form={formNuevoProducto} setForm={setFormNuevoProducto} categorias={categorias} onSubmit={AgregarProducto} onCerrar={() => setCreandoProducto(false)}/>
                        )}

                        {creandoLocal && (
                            <CrearLocal form={formNuevoLocal} setForm={setFormNuevoLocal} onSubmit={AgregarLocal} onCerrar={() => setCreandoLocal(false)} />
                        )}

                        {editandoLocal && (
                            <ModificarLocal local={editandoLocal} setLocal={setEditandoLocal} onSubmit={ActualizarLocalSubmit} onBorrar={BorrarLocal} onCerrar={() => setEditandoLocal(null)} />
                        )}

                    </div>
                ) : (
                    <div className="vendedor-empty-container">
                        <p className="vendedor-empty-text">No hay locales registrados o seleccionados.</p>
                        <button className="btn-add-local" onClick={() => setCreandoLocal(true)}>Crear tu primer Local</button>
                        {creandoLocal && (
                            <CrearLocal form={formNuevoLocal} setForm={setFormNuevoLocal} onSubmit={AgregarLocal} onCerrar={() => setCreandoLocal(false)} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeVendedor;