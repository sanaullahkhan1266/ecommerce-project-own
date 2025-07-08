import React from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center gap-8">
         <Link to="/"> <img src={assets.logo}  alt="logo" className="h-10 w-auto" style={{ fontFamily: 'serif', fontWeight: 'bold' }} /></Link>
          <ul className="flex gap-6 text-xs font-semibold tracking-wide uppercase text-black">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/collection">COLLECTION</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li><NavLink to="/contact">CONTACT</NavLink></li>
          </ul>
        </div>
        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <img src={assets.search_icon} className="w-5 cursor-pointer" alt="search" />
          <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="profile" />
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
          </Link>
          <img src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer sm:hidden" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
