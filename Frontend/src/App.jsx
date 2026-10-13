import { useState } from 'react'
import './App.css'
import Cabecera from './Componentes/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './Componentes/Login'
import Register from './Componentes/Register'
import RegisterType from './Componentes/RegisterType'
import RegisterUser from './Componentes/RegisterUser'
import RegisterVendedor from './Componentes/RegisterVendedor'
function App() {
  

  return (
    <>
      <header>
          <Cabecera/>
      </header>
      <main>
      
      </main>
      <footer>
    
      </footer>
      <Routes>
        <Route element={<Login/>} path='/Login'></Route>
        <Route element={<RegisterType/>} path='/RegisterType'></Route>
        <Route element={<RegisterUser/>} path='/RegisterUser'></Route>
        <Route element={<RegisterVendedor/>} path='/RegisterVendedor'></Route>
      </Routes>
    </>
  )
}

export default App
