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
        </Routes>
      </main>

      <footer>
        
      </footer>
      
    </>
  )
}

export default App