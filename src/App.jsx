import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import './App.css'
import Register from './pages/RegiterPage'
import Navbar from './Components/Navbar'
import Login from './pages/Login'
import EcoPage from './pages/EcomPage'
import AddProduct from './Components/AddProduct'
import ProductInformation from './Components/ProductInformation'
import UpdateProduct from './Components/UpdateProduct'
import Cart from './Components/Cart'
import ProductSearch from './Components/ProductSearch'

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
  
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/eco-store' element={<EcoPage />} />
   <Route path='/AddProduct' element={<AddProduct />} />
  <Route path="/ProductInformation/:id" element={<ProductInformation />} />
  <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
    <Route path="/Cart" element={<Cart />} />
      <Route path="/ProductSearch/:keyword" element={<ProductSearch />} />
</Routes>

    </BrowserRouter>
    </>
  )
}

export default App
