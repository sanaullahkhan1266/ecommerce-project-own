import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

// Demo: Override images for visual diversity (HD Unsplash fashion images)
const demoImages = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
];

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products.slice(0, 4).map((item, idx) => ({ ...item, image: demoImages[idx] }));

  return (
    <div className="my-8 w-full" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {latestProducts.map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden shadow bg-white"
            style={{ height: '100vh' }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 p-8 flex flex-col h-full justify-start">
              <h2 className="text-2xl font-bold mb-1 text-black" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{item.name}</h2>
              <p className="text-base text-black mb-8" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{item.description || ''}</p>
              <Link to="/explore" className="font-semibold text-black uppercase tracking-wide mt-2 inline-block group" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Explore
                <span className="block w-12 h-[2px] bg-black mt-1 group-hover:w-16 transition-all"></span>
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
