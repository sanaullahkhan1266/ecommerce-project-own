import React, { useRef, useEffect, createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About';
import Explore from './pages/Explore';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopProvider } from "./context/ShopContext";



const App = () => {
  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm] xl:px-[12vm] 2xl:px-[14vm]">
      <ToastContainer position="bottom-left" autoClose={2000} />
      <ShopProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ShopProvider>
    </div>
  )
}

export default App

