import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
];

const EssentialsHero = () => (
  <section className="w-full bg-[#f7f3ef] py-12 px-4 flex flex-col items-center text-center">
    {/* Logo/Title */}
    <div className="tracking-[0.3em] text-lg font-semibold mb-4 text-gray-800" style={{ letterSpacing: '0.3em' }}>
      SÉZANE
    </div>
    {/* Headline */}
    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, Times, serif' }}>
      WINTER<br />ESSENTIALS
    </h1>
    {/* Description */}
    <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-800 mb-8">
      Our <span className="font-bold">New Essentials Collection</span> is now online! At the heart of our story since day one, these pieces immediately became legendary and have never left our side. Synonymous with French style, our classics evolve every year, becoming stronger and even more iconic.
    </p>
    {/* Discover Button */}
    <a
      href="#"
      className="block w-full max-w-md mx-auto bg-black text-white font-bold uppercase tracking-wide py-4 text-lg rounded-none hover:bg-gray-900 transition mb-10"
      style={{ letterSpacing: '0.05em' }}
    >
      Discover
    </a>
    {/* Image Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
      {images.map((img, i) => (
        <div key={i} className="aspect-[3/4] bg-gray-200 overflow-hidden">
          <img src={img} alt="Essentials" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </section>
);

export default EssentialsHero; 