import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../components/Navbar';
import gsap from 'gsap';
import { motion, useAnimation } from 'framer-motion';
import Footer from '../components/Footer';

const heroImg = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'; // Elegant suit
const menImgs = [
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80', // Man in tuxedo
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', // Man in blue suit
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // Man in formal wear
];
const womenImgs = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', // Woman in elegant dress
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', // Woman in formal suit
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', // Woman in white dress
];

const bannerTexts = [
  "*",
  "60% Off On Older Collections",
  "*",
  "In Order To Keep The Collections",
  "*",
  "Men's Archive",
  "*"
];

const Collection = () => {
  const heroRef = useRef(null);
  const bannerRef = useRef(null);
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const controls = useAnimation();
  const isPaused = useRef(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all'); // 'all', 'men', 'women'

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, y: 50, duration: 1 });
    gsap.from(bannerRef.current, { opacity: 0, y: 30, duration: 1, delay: 0.5 });
    gsap.from(menRef.current, { opacity: 0, x: -50, duration: 1, delay: 0.8 });
    gsap.from(womenRef.current, { opacity: 0, x: 50, duration: 1, delay: 1.1 });
  }, []);

  // Animation settings
  const marquee = {
    animate: { x: ['100%', '-100%'] },
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 10, // Adjust speed here (lower is faster)
      ease: 'linear'
    }
  };

  return (
      <div className="bg-white min-h-screen w-full font-sans overflow-x-hidden">
        {/* Filters Button (floating or near section) */}
        <button
          onClick={() => setShowFilters(true)}
          className="fixed right-6 top-28 z-40 px-5 py-2 bg-transparent text-black border border-black rounded-full uppercase font-bold shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          Filters
        </button>

        {/* Filter Sidebar/Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-30"
              onClick={() => setShowFilters(false)}
            />
            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 p-8 overflow-y-auto border-l border-gray-200 transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-6">
                <div className="uppercase text-lg font-bold">Filters</div>
                <button
                  className="text-2xl font-light hover:text-black hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 border border-black border-opacity-10"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <hr className="mb-6" />
              {/* Gender Filter */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">Gender</div>
                <div className="flex gap-3">
                  <button
                    className={`px-4 py-2 rounded-full font-bold uppercase border ${selectedGender === 'all' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                    onClick={() => setSelectedGender('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full font-bold uppercase border ${selectedGender === 'men' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                    onClick={() => setSelectedGender('men')}
                  >
                    Men
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full font-bold uppercase border ${selectedGender === 'women' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                    onClick={() => setSelectedGender('women')}
                  >
                    Women
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <Navbar/>
        <div className="flex items-center justify-center w-full my-6">
          <motion.span
            className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-700 to-gray-400 drop-shadow-lg"
            style={{ lineHeight: 1, letterSpacing: '0.1em', display: 'inline-block' }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "linear"
            }}
          >
            *
          </motion.span>
        </div>
        <section ref={heroRef} className="w-full border-b border-black">
          <h1
            className="text-[14vw] md:text-[10vw] font-extrabold uppercase text-black leading-none tracking-tight text-center md:text-left px-2 pt-8"
            style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}
          >
            Always Bé Loyan
          </h1>
          <div className="grid grid-cols-3 gap-2 max-w-6xl mx-auto mt-8 mb-8 px-2">
            <div className="col-span-1 flex flex-col gap-2">
              {/* Star in its own box with hover animation */}
              <motion.div
                className="bg-gray-200 flex items-center justify-center h-40 md:h-64 mb-2 rounded transition-shadow"
                whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.span
                  className="text-9xl md:text-[10rem] font-extrabold text-black"
                  style={{ lineHeight: 1, display: 'inline-block' }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    ease: "linear"
                  }}
                >
                  *
                </motion.span>
              </motion.div>
              {/* Description and button in their own box with hover animation */}
              <motion.div
                className="bg-gray-100 flex flex-col items-center justify-center h-40 md:h-64 p-4 text-center rounded transition-shadow"
                whileHover={{ y: -8, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-xs md:text-sm text-black mb-4 tracking-wide leading-relaxed">
                  OFFICINE GÉNÉRALE PROPOSES<br />
                  WELL-DEVELOPED, THOUGHTFUL<br />
                  CLOTHES WITH A DISCERNING<br />
                  POINT-OF-VIEW.
                </div>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to="/explore"
                    className="inline-block bg-black text-white text-xs font-bold uppercase px-4 py-2 tracking-wider rounded hover:bg-gray-900 transition-all duration-200"
                  >
                    See All Collection <span className="ml-1">▶</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <div className="col-span-2 row-span-2">
              <motion.img
                src={heroImg}
                alt="Hero"
                className="w-full h-full object-cover grayscale"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </section>

        {/* Banner */}
        <div
          ref={bannerRef}
          className="w-full bg-black text-white text-2xl md:text-3xl font-extrabold uppercase py-4 border-b border-black overflow-hidden"
        >
          <motion.div
            className="flex items-center gap-6 whitespace-nowrap"
            style={{ minWidth: "max-content", display: "inline-flex" }}
            {...marquee}
            onMouseEnter={() => {
              controls.stop();
              isPaused.current = true;
            }}
            onMouseLeave={() => {
              if (isPaused.current) {
                controls.start(marquee.animate, marquee.transition);
                isPaused.current = false;
              }
            }}
            animate={controls}
          >
            {bannerTexts.map((text, idx) =>
              text === "*" ? (
                <motion.span
                  key={idx}
                  className="text-5xl md:text-6xl mx-2"
                  style={{ lineHeight: 1, display: 'inline-block' }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    ease: "linear"
                  }}
                >
                  {text}
                </motion.span>
              ) : (
                <span key={idx}>{text}</span>
              )
            )}
          </motion.div>
        </div>

        {/* Men Collection */}
        {(selectedGender === 'all' || selectedGender === 'men') && (
          <section ref={menRef} className="max-w-6xl mx-auto py-12 px-2 border-b border-black">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-5xl md:text-6xl font-extrabold uppercase text-black tracking-tight" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>
                Men Collection
              </h2>
              <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-4 py-2 tracking-wider hover:bg-gray-900 transition-all duration-200">
                See All <span className="ml-1">▶</span>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="col-span-3 row-span-2 relative">
                <motion.img
                  src={menImgs[0]}
                  alt="Men Main"
                  className="w-full h-96 object-cover grayscale"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute left-6 bottom-6 text-left">
                  <div className="text-xs uppercase">Shop by our collection</div>
                  <div className="text-3xl md:text-4xl font-extrabold mt-1" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>Daily Classic</div>
                </div>
              </div>
              <motion.img
                src={menImgs[1]}
                alt="Men 2"
                className="w-full h-64 object-cover grayscale"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.img
                src={menImgs[2]}
                alt="Men 3"
                className="w-full h-64 object-cover grayscale"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={menImgs[0]} alt="Men Product 1" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Seamless Sweater</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={menImgs[1]} alt="Men Product 2" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Hoche Pant</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={menImgs[2]} alt="Men Product 3" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Brutus Sweater</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Women Collection */}
        {(selectedGender === 'all' || selectedGender === 'women') && (
          <section ref={womenRef} className="max-w-6xl mx-auto py-12 px-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-5xl md:text-6xl font-extrabold uppercase text-black tracking-tight" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>
                Women Collection
              </h2>
              <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-4 py-2 tracking-wider hover:bg-gray-900 transition-all duration-200">
                See All <span className="ml-1">▶</span>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="col-span-3 row-span-2 relative">
                <motion.img
                  src={womenImgs[0]}
                  alt="Women Main"
                  className="w-full h-96 object-cover grayscale"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute left-6 bottom-6 text-left">
                  <div className="text-xs uppercase">Shop by our collection</div>
                  <div className="text-3xl md:text-4xl font-extrabold mt-1" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>Regular Gloomy</div>
                </div>
              </div>
              <motion.img
                src={womenImgs[1]}
                alt="Women 2"
                className="w-full h-64 object-cover grayscale"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.img
                src={womenImgs[2]}
                alt="Women 3"
                className="w-full h-64 object-cover grayscale"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={womenImgs[0]} alt="Women Product 1" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Classic Shirt</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={womenImgs[1]} alt="Women Product 2" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Wool Pant</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col">
                <img src={womenImgs[2]} alt="Women Product 3" className="w-full h-72 object-cover grayscale" />
                <div className="flex items-center justify-between p-4">
                  <span className="uppercase text-xs font-bold">Gloomy Sweater</span>
                  <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 tracking-wider hover:bg-gray-900 transition-all duration-200">Details ▶</Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
  );
};

export default Collection; 