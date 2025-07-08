import React, { useState } from 'react';

const images = [
  // Top row
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 2 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 2 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 2, row: 2 },
  // Middle collage
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 2, row: 2 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 2 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 2 },
  // Bottom row
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', col: 1, row: 1 },
];

const gridClasses = [
  // Top row
  'col-span-1 row-span-2',
  'col-span-1 row-span-2',
  'col-span-2 row-span-2',
  // Middle collage
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-2',
  'col-span-1 row-span-2',
  'col-span-1 row-span-2',
  // Bottom row
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="w-full bg-[#f7f3ef] py-12 px-4 flex flex-col items-center text-center min-h-screen">
      {/* Logo/Title */}
      <div className="tracking-[0.3em] text-lg font-semibold mb-4 text-gray-800" style={{ letterSpacing: '0.3em' }}>
        SÉZANE
      </div>
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, Times, serif' }}>
        NEWSLETTER
      </h1>
      {/* Description */}
      <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-800 mb-8">
        Our <span className="font-bold">Newsletter</span> is your ticket to exclusive offers, new arrivals, and the latest updates. Be the first to know and never miss out on our iconic collections and special events.
      </p>
      {/* Subscribe Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center mb-10">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 text-base outline-none transition-all duration-200 bg-white shadow-sm"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-none bg-black text-white font-bold uppercase tracking-wide text-lg hover:bg-gray-900 transition-all duration-200"
          style={{ letterSpacing: '0.05em' }}
        >
          Subscribe
        </button>
      </form>
      {submitted && (
        <div className="text-green-600 font-semibold text-base mb-8">Thank you for subscribing!</div>
      )}
      {/* Collage Image Grid */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-4xl mx-auto mt-8 auto-rows-[120px] md:auto-rows-[180px]">
        {images.map((img, i) => (
          <div key={i} className={`bg-gray-200 overflow-hidden ${gridClasses[i]}`}>
            <img src={img.src} alt="Newsletter" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsletterPage; 