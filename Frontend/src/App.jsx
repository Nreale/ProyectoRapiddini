import './App.css'
import Cabecera from './Componentes/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Componentes/Home'
import Login from './Componentes/Login'
import RegisterType from './Componentes/RegisterType'
import RegisterUser from './Componentes/RegisterUser'
import RegisterVendedor from './Componentes/RegisterVendedor'
import RegisterRepartidor from './Componentes/RegisterRepartidores'
function App() {
  return (
    <>
      <header>
          <Cabecera />
      </header>
      
      <main>
          
      </main>

      <footer>
        
      </footer>
      <Routes>
        <Route element={<Home/>} path='/'></Route>
        <Route element={<Login/>} path='/Login'></Route>
        <Route element={<RegisterType/>} path='/RegisterType'></Route>
        <Route element={<RegisterUser/>} path='/RegisterUser'></Route>
        <Route element={<RegisterVendedor/>} path='/RegisterVendedor'></Route>
        <Route element={<RegisterRepartidor/>} path='/RegisterRepartidor'></Route>
      </Routes>
    </>
  )
}

export default App