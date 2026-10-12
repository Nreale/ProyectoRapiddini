import { useState } from 'react'
import './App.css'
import Cabecera from './Componentes/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './Componentes/Login'
import Register from './Componentes/Register'
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
        <Route element={<Register/>} path='/Register'></Route>
      </Routes>
    </>
  )
}

export default App
