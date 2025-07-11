import React, { useState, useRef, useEffect, useContext } from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const { cart } = useContext(ShopContext);

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

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 relative z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left: Logo and Nav Links */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" onClick={closeMenu}>
              <img src={assets.logo} alt="logo" className="h-6 sm:h-8 w-auto" style={{ fontFamily: 'serif', fontWeight: 'bold' }} />
            </Link>
            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 font-semibold tracking-wide uppercase text-black">
              <li className="text-[10px]"><NavLink to="/">HOME</NavLink></li>
              <li className="text-[10px]"><NavLink to="/collection">COLLECTION</NavLink></li>
              <li className="text-[10px]"><NavLink to="/about">ABOUT</NavLink></li>
              <li className="text-[10px]"><NavLink to="/contact">CONTACT</NavLink></li> 
            </ul>
          </div>
          
          {/* Right: Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={assets.search_icon} className="w-4 h-4 cursor-pointer" alt="search" />
            <img src={assets.profile_icon} className="w-4 h-4 cursor-pointer" alt="profile" />
            <Link to="/cart" className="relative" onClick={closeMenu}>
              <img src={assets.cart_icon} alt="cart" className="w-4 h-4 min-w-4" />
              {cartCount > 0 && (
                <p className="absolute right-[-5px] bottom-[-5px] w-3.5 h-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px] flex items-center justify-center">{cartCount}</p>
              )}
            </Link>
            {/* Mobile Menu Button */}
            <motion.button 
              onClick={toggleMenu}
              className="md:hidden p-1"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img 
                src={isMenuOpen ? assets.cross_icon : assets.menu_icon} 
                alt="menu" 
                className="w-4 h-4" 
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={overlayRef}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={closeMenu}
            />
            
            {/* Side Menu - Now from LEFT */}
            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 100,
                duration: 0.6
              }}
            >
              {/* Menu Header */}
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

              {/* Menu Items */}
              <div className="p-6 overflow-y-auto h-full">
                <ul className="space-y-4">
                  <motion.li className="menu-item">
                    <NavLink 
                      to="/" 
                      onClick={closeMenu} 
                      className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div>
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                          HOME
                        </span>
                        <span className="block text-xs text-gray-500">Featured products</span>
                      </div>
                    </NavLink>
                  </motion.li>

                  <motion.li className="menu-item">
                    <NavLink 
                      to="/collection" 
                      onClick={closeMenu} 
                      className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div>
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                          COLLECTION
                        </span>
                        <span className="block text-xs text-gray-500">Browse all products</span>
                      </div>
                    </NavLink>
                  </motion.li>

                  <motion.li className="menu-item">
                    <NavLink 
                      to="/about" 
                      onClick={closeMenu} 
                      className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div>
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                          ABOUT
                        </span>
                        <span className="block text-xs text-gray-500">Our brand story</span>
                      </div>
                    </NavLink>
                  </motion.li>

                  <motion.li className="menu-item">
                    <NavLink 
                      to="/contact" 
                      onClick={closeMenu} 
                      className="block p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div>
                        <span className="block text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                          CONTACT
                        </span>
                        <span className="block text-xs text-gray-500">Get in touch</span>
                      </div>
                    </NavLink>
                  </motion.li>
                </ul>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <motion.button 
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img src={assets.search_icon} alt="search" className="w-5 h-5" />
                      <span className="text-gray-700 font-medium">Search Products</span>
                    </motion.button>
                    
                    <motion.button 
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img src={assets.profile_icon} alt="profile" className="w-5 h-5" />
                      <span className="text-gray-700 font-medium">My Account</span>
                    </motion.button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Free shipping on orders over $50</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
