import { useState } from 'react'
import './App.css'
import Cabecera from './Componentes/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Componentes/Home'
import Login from './Componentes/Login'
import Register from './Componentes/Register'
import RegisterType from './Componentes/RegisterType'
import RegisterUser from './Componentes/RegisterUser'
import RegisterVendedor from './Componentes/RegisterVendedor'

function App() {
  return (
    <>
      <header>
          <Cabecera />
      </header>
      
      <main>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Login />} path='/Login' />
          <Route element={<RegisterType />} path='/RegisterType' />
          <Route element={<RegisterUser />} path='/RegisterUser' />
          <Route element={<RegisterVendedor />} path='/RegisterVendedor' />
        </Routes>
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default App