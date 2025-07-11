import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Navbar from './../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [product, setProduct] = useState(null);
  const [clickedSize, setClickedSize] = useState(null);
  
  // Refs for GSAP animations
  const productRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null);

  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(Array.isArray(foundProduct.image) ? foundProduct.image[0] : foundProduct.image);
      // Set default size to first available size
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      toast.error('Product not found!');
    }
  }, [id, products]);

  // GSAP animations on component mount
  useEffect(() => {
    if (product) {
      // Initial page load animation
      const tl = gsap.timeline();
      
      tl.fromTo(productRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(infoRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Scroll-triggered animations
      gsap.fromTo(".size-button",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".size-selection",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".product-detail",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".product-overview",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [product]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setClickedSize(size);
    
    // GSAP animation for size selection
    gsap.to(`[data-size="${size}"]`, {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    
    setTimeout(() => setClickedSize(null), 2000);
  };

  const handleAddToCart = (size) => {
    if (!product) return;
    if (!size) {
      toast.error('Please select a size before adding to cart!');
      return;
    }
    
    // GSAP animation for add to cart button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    
    addToCart(product._id, size, {
      name: product.name,
      price: product.price,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      description: product.description
    });
    toast.success(`Added ${product.name} (Size: ${size}) to cart!`, { autoClose: 2000 });
  };

  // Show loading if product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <motion.div 
          className="min-h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Product not found
            </motion.div>
            <motion.div 
              className="text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              The product you're looking for doesn't exist.
            </motion.div>
          </div>
        </motion.div>
      </>
    );
  }

  // Generate suggestions based on same category
  const suggestions = products
    .filter(p => p._id !== id && p.category === product.category)
    .slice(0, 4)
    .map(p => ({
      id: p._id,
      img: Array.isArray(p.image) ? p.image[0] : p.image,
      name: p.name,
      rating: 4.5,
      price: p.price,
      oldPrice: p.price * 1.2, // 20% markup for old price
      discount: 20,
    }));

  // Helper: get up to 3 images, always as an array
  const images = Array.isArray(product?.image) ? product.image : [product?.image];

  return (
    <>
      <Navbar />
      <motion.div 
        ref={productRef}
        className="min-h-screen flex justify-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-lg flex flex-col md:flex-row w-full max-w-6xl items-start">
          {/* Right: Product Images - main image with thumbnails on the right */}
          <motion.div 
            ref={imageRef}
            className="w-full md:w-1/2 p-8 flex flex-col items-start order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8, rotation: -5 }}
            animate={{ opacity: 1, scale: 1, rotation: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full">
              <div className="flex w-full items-start">
                {/* Main Image with accent background and bigger size */}
                <motion.div 
                  className="flex-1 flex items-start justify-center bg-light-accent2"
                  style={{ borderRadius: '1rem', minHeight: 520 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.img
                    src={mainImage}
                    alt={product.name}
                    className="object-contain w-full rounded-xl"
                    style={{ maxWidth: 520, maxHeight: 520 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    key={mainImage} // Force re-animation when image changes
                  />
                </motion.div>
                
                {/* Thumbnails on the right (vertical on desktop) */}
                <div className="hidden md:flex flex-col gap-4 ml-4">
                  {images.slice(0, 3).map((img, idx) => (
                    <motion.button
                      key={idx}
                      className={`w-20 h-28 overflow-hidden rounded-xl ${mainImage === img ? 'ring-2 ring-black' : ''}`}
                      onClick={() => setMainImage(img)}
                      style={{ minWidth: 0 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.5 + idx * 0.1, 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }}
                    >
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="object-contain w-full h-full rounded-xl"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Thumbnails below main image on mobile */}
              <div className="flex md:hidden gap-4 mt-4 w-full justify-center">
                {images.slice(0, 3).map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={`w-20 h-28 overflow-hidden rounded-full ${mainImage === img ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setMainImage(img)}
                    style={{ minWidth: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6 + idx * 0.1, 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }}
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="object-contain w-full h-full rounded-full"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Left: Product Info */}
          <motion.div 
            ref={infoRef}
            className="w-full md:w-1/2 p-8 flex flex-col items-start order-2 md:order-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full">
              <motion.button
                className="mb-8 flex items-center gap-2 text-xl font-bold text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-2xl">&larr;</span>
                <span>Back</span>
              </motion.button>
              
              <motion.h1 
                className="text-2xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.div 
                className="flex items-baseline gap-2 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-2xl mt-3 font-semibold">${product.price}</span>
                <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-xs text-green-600 font-semibold">20% OFF</span>
              </motion.div>
              
              {/* Size Selection */}
              <div className="mb-6 size-selection">
                <div className="font-semibold mb-2">Size:</div>
                <div className="flex gap-2">
                  {product.sizes?.map((size, index) => (
                    <motion.button
                      key={size}
                      data-size={size}
                      onClick={() => handleSizeClick(size)}
                      className={`size-button rounded-full px-4 py-1 text-sm font-medium transition ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1, 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {clickedSize && (
                    <motion.div 
                      className="mt-2 text-green-600 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓ Size {clickedSize} selected!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Product Overview - all details */}
              <motion.div 
                className="mb-8 product-overview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="font-bold text-lg mb-3 product-detail">Product overview</div>
                <motion.div 
                  className="text-gray-900 text-base leading-relaxed p-6 text-lg rounded-lg space-y-2 product-detail"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div><span className="font-semibold">Description:</span> {product.description}</div>
                  {product.sku && (
                    <div><span className="font-semibold">SKU:</span> {product.sku}</div>
                  )}
                  {product.material && (
                    <div><span className="font-semibold">Material:</span> {product.material}</div>
                  )}
                  {product.care && (
                    <div><span className="font-semibold">Care Instructions:</span> {product.care}</div>
                  )}
                  {product.origin && (
                    <div><span className="font-semibold">Country of Origin:</span> {product.origin}</div>
                  )}
                </motion.div>
              </motion.div>
              
              {/* Delivery, Return & Exchange Policy */}
              <motion.div 
                className="mb-8 product-detail"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="font-bold text-lg mb-3">Delivery, Return &amp; Exchange Policy</div>
                <motion.div 
                  className="text-gray-700 text-base leading-relaxed text-lg"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Delivery in 3-4 working days. Easy 7-day return &amp; exchange available. Product must be unused and in original packaging for returns. For more details, see our <a href="#" className="underline hover:text-black">Return Policy</a>.
                </motion.div>
              </motion.div>
              
              {/* Action Button */}
              <motion.div 
                ref={buttonRef}
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.button
                  className="w-full bg-black text-white py-4 text-lg rounded-xl font-bold hover:bg-gray-800 transition"
                  onClick={() => handleAddToCart(selectedSize)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  ADD TO BAG
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Small Footer */}
      <motion.div 
        className="mt-16 pt-4 border-t border-gray-00 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-black text-sm">
          © 2024 Loyan.co . All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2 mb-3 text-xs text-black">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
        </div>
      </motion.div>
    </>
  );
};

export default Product;
