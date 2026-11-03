import './App.css'
import Cabecera from './Componentes/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Componentes/Home'
import Login from './Componentes/Login'
import RegisterType from './Componentes/RegisterType'
import RegisterUser from './Componentes/RegisterUser'
import RegisterVendedor from './Componentes/RegisterVendedor'
import RegisterRepartidor from './Componentes/RegisterRepartidores'
import Configuracion from './Componentes/Configuracion';
import CambiarContraseña from './Componentes/CambiarContraseña'
import Carrito from './Componentes/Carrito'
import DetalleLocal from './Componentes/Locales'
import CrearLocal from './Componentes/CrearLocal'

function App() {
  
  return (
    <>
      <header>
          <Cabecera />
      </header>
      
      <main>
        <Routes>
          <Route element={<CambiarContraseña/>} path='/recuperar-password'></Route>
          <Route element={<Home/>} path='/'></Route>
          <Route element={<Login/>} path='/Login'></Route>
          <Route element={<RegisterType/>} path='/RegisterType'></Route>
          <Route element={<RegisterUser/>} path='/RegisterUser'></Route>
          <Route element={<RegisterVendedor/>} path='/RegisterVendedor'></Route>
          <Route element={<RegisterRepartidor/>} path='/RegisterRepartidor'></Route>
          <Route element={<Configuracion />} path="/Configuracion"></Route>
          <Route element={<Carrito />} path="/Carrito"></Route>
          <Route element={<DetalleLocal />} path="/local/:nombre"></Route>
          <Route element={<CrearLocal />} path="/crear-local"></Route>
        </Routes>
      </main>

      <footer>
        
      </footer>
      
    </>
  )
}

export default App