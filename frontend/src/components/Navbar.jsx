import React, { useState, useRef, useEffect, useContext } from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { cart, isAuthenticated, logout, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    closeMenu();
    navigate('/');
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            
            {/* User Profile or Login */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all duration-200"
                  style={{ minWidth: '40px' }}
                >
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                      style={{ minWidth: '32px', minHeight: '32px' }}
                    />
                  ) : null}
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 text-gray-400 ${userDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div 
                      className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50"
                      style={{
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255,255,255,0.95)'
                      }}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          {user.picture && (
                            <img 
                              src={user.picture} 
                              alt="Profile" 
                              className="w-12 h-12 rounded-full object-cover border-3 border-gray-100 shadow-sm"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate" style={{ fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>
                              {user.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
                              {user.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                          style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors duration-200">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="font-medium">My Profile</span>
                        </Link>
                        
                        <Link
                          to="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                          style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors duration-200">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <span className="font-medium">My Orders</span>
                        </Link>

                        <div className="border-t border-gray-50 my-2"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                          style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors duration-200">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-sanrif text-gray-800 hover:text-gray-600 transition-colors duration-300"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
            
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
                {/* User Info Section */}
                {isAuthenticated && user && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {user.picture && (
                        <img 
                          src={user.picture} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover border-3 border-gray-100 shadow-sm"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate" style={{ fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>
                          {user.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 truncate" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
                          {user.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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
                  
                  {/* User-specific menu items */}
                  {isAuthenticated && (
                    <>
                      <motion.li className="menu-item">
                        <NavLink to="/profile" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                          <div className="text-left">
                            <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">PROFILE</span>
                            <span className="block text-xs text-gray-500">Manage your account</span>
                          </div>
                        </NavLink>
                      </motion.li>
                      <motion.li className="menu-item">
                        <NavLink to="/orders" onClick={closeMenu} className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left">
                          <div className="text-left">
                            <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">ORDERS</span>
                            <span className="block text-xs text-gray-500">View your orders</span>
                          </div>
                        </NavLink>
                      </motion.li>
                      <motion.li className="menu-item">
                        <button 
                          onClick={handleLogout}
                          className="block w-full p-4 hover:bg-red-50 rounded-lg transition-colors duration-200 text-left"
                        >
                          <div className="text-left">
                            <span className="block text-lg font-bold text-red-600 hover:text-red-700 transition-colors duration-300">SIGN OUT</span>
                            <span className="block text-xs text-red-500">Logout from your account</span>
                          </div>
                        </button>
                      </motion.li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
