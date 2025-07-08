import React from 'react';
import { Link } from 'react-router-dom';

const heroImg = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80';
const menImgs = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
];
const womenImgs = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=800&q=80',
];

const CollectionPage = () => (
  <div className="bg-white min-h-screen w-full font-sans">
    {/* Hero Section */}
    <section className="w-full border-b border-black">
      <h1 className="text-[7vw] font-extrabold uppercase text-black leading-none tracking-tight text-center md:text-left px-2 pt-8" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>
        Always Bé Paris
      </h1>
      <div className="grid grid-cols-3 gap-2 max-w-6xl mx-auto mt-8 mb-8 px-2">
        <div className="col-span-1 flex flex-col gap-2">
          <div className="bg-gray-200 flex items-center justify-center h-40 md:h-64">
            <span className="text-[5vw] md:text-6xl font-extrabold">*</span>
          </div>
          <div className="bg-gray-100 flex flex-col justify-between h-40 md:h-64 p-4 text-left">
            <div className="text-xs md:text-sm text-black mb-4">OFFICINE GÉNÉRALE PROPOSES WELL-DEVELOPED, THOUGHTFUL CLOTHES WITH A DISCERNING POINT-OF-VIEW.</div>
            <Link to="/explore" className="inline-block bg-black text-white text-xs font-bold uppercase px-4 py-2 tracking-wider hover:bg-gray-900 transition-all duration-200">
              See All Collection <span className="ml-1">▶</span>
            </Link>
          </div>
        </div>
        <div className="col-span-2 row-span-2">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
    </section>

    {/* Banner */}
    <div className="w-full bg-black text-white text-2xl md:text-3xl font-extrabold uppercase py-4 flex items-center justify-center gap-6 whitespace-nowrap overflow-x-auto border-b border-black">
      <span>*</span>
      <span>60% Off On Older Collections</span>
      <span>*</span>
      <span>In Order To Keep The Collections</span>
      <span>*</span>
      <span>Men's Archive</span>
      <span>*</span>
    </div>

    {/* Men Collection */}
    <section className="max-w-6xl mx-auto py-12 px-2 border-b border-black">
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
          <img src={menImgs[0]} alt="Men Main" className="w-full h-96 object-cover grayscale" />
          <div className="absolute left-6 bottom-6 text-left">
            <div className="text-xs uppercase">Shop by our collection</div>
            <div className="text-3xl md:text-4xl font-extrabold mt-1" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>Daily Classic</div>
          </div>
        </div>
        <img src={menImgs[1]} alt="Men 2" className="w-full h-64 object-cover grayscale" />
        <img src={menImgs[2]} alt="Men 3" className="w-full h-64 object-cover grayscale" />
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

    {/* Women Collection */}
    <section className="max-w-6xl mx-auto py-12 px-2">
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
          <img src={womenImgs[0]} alt="Women Main" className="w-full h-96 object-cover grayscale" />
          <div className="absolute left-6 bottom-6 text-left">
            <div className="text-xs uppercase">Shop by our collection</div>
            <div className="text-3xl md:text-4xl font-extrabold mt-1" style={{ fontFamily: 'Oswald, Bebas Neue, Impact, Arial Black, sans-serif' }}>Regular Gloomy</div>
          </div>
        </div>
        <img src={womenImgs[1]} alt="Women 2" className="w-full h-64 object-cover grayscale" />
        <img src={womenImgs[2]} alt="Women 3" className="w-full h-64 object-cover grayscale" />
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
  </div>
);

export default CollectionPage; 