import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SellerLayout from './components/seller/SellerLayout'
import Cart from './pages/Cart'
function App() {
  return (
   <>
      <Navbar />
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/seller' element={<SellerLayout />}/>
          <Route path='/cart' element={<Cart />}/>
        </Routes>
      <Footer />
   </>
  )
}

export default App
