import React, { useState, useRef, useEffect, useContext } from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ShopContext } from '../context/ShopContext';
import profileIcon from "../assets/profile_icon.png";
import ProductGallery from "../components/ProductGallery";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const { cart, isAuthenticated, logout } = useContext(ShopContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // GSAP animation for menu items
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const menuItems = menuRef.current.querySelectorAll('.menu-item');
      
      gsap.fromTo(menuItems, 
        { 
          x: 50, 
          opacity: 0,
          scale: 0.8
        },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full border-b relative z-40">
        <div className="flex items-center justify-between px-2 sm:px-6 py-3">
          {/* Left: Hamburger */}
          <div className="flex-shrink-0 flex items-center" style={{ minWidth: '48px' }}>
            <motion.button
              onClick={toggleMenu}
              className="p-1"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              style={{ background: "none", border: "none" }}
            >
              {!isMenuOpen ? (
                <div className="flex flex-col justify-between w-12 h-4">
                  <span className="block h-0.5 w-full bg-black rounded"></span>
                  <span className="block h-0.5 w-10/12 bg-black rounded ml-2"></span>
                  <span className="block h-0.5 w-full bg-black rounded"></span>
                </div>
              ) : (
                <img src={assets.cross_icon} alt="close" className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" onClick={closeMenu}>
              <img
                src={assets.logo}
                alt="logo"
                className="h-10 sm:h-12 w-auto"
                style={{ fontFamily: 'serif', fontWeight: 'bold' }}
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-shrink-0 flex items-center gap-5 sm:gap-6" style={{ minWidth: '120px', justifyContent: 'flex-end' }}>
            <img src={assets.search_icon} className="w-4 h-4 cursor-pointer" alt="search" />
            <NavLink
              to="/login"
              className="text-sm font-sanrif text-gray-800 hover:text-gray-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              Login
            </NavLink>
            <Link to="/cart" className="relative flex items-center" onClick={closeMenu}>
              <img src={assets.cart_icon} alt="cart" className="w-4 h-4 min-w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -bottom-2 w-4 h-4 bg-black text-white rounded-full text-[10px] flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={overlayRef}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[9998] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={closeMenu}
            />
            {/* Side Menu */}
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] md:hidden overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6
              }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                    <p className="text-sm text-gray-500 mt-1">Navigate to your destination</p>
                  </div>
                  <motion.button
                    onClick={closeMenu}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={assets.cross_icon} alt="close" className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto h-full">
                <ul className="space-y-4">
                  <motion.li className="menu-item">
                    <NavLink to="/" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">HOME</span>
                        <span className="block text-xs text-gray-500">Featured products</span>
                      </div>
                    </NavLink>
                  </motion.li>
                  <motion.li className="menu-item">
                    <NavLink to="/collection" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">COLLECTION</span>
                        <span className="block text-xs text-gray-500">Browse all products</span>
                      </div>
                    </NavLink>
                  </motion.li>
                  <motion.li className="menu-item">
                    <NavLink to="/about" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">ABOUT</span>
                        <span className="block text-xs text-gray-500">Our brand story</span>
                      </div>
                    </NavLink>
                  </motion.li>
                  <motion.li className="menu-item">
                    <NavLink to="/contact" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">CONTACT</span>
                        <span className="block text-xs text-gray-500">Get in touch</span>
                      </div>
                    </NavLink>
                  </motion.li>
                  {/* Add more NavLinks for other pages as needed */}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const dropdownItemStyle = {
  display: "block",
  padding: "10px 16px",
  color: "#333",
  textDecoration: "none",
  cursor: "pointer",
};

export default Navbar
