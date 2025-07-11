import React, { useState } from 'react';

// Replace these with your actual images and labels
const collabModels = [
  { img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80', label: 'UNDERT & CO.' },
  { img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', label: 'NYC RATED SOC. SUPPORTED' },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', label: '[ALIEN STORE COLLECTION]' },
  { img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', label: '(88 UNIQUE ITEMS)' },
  { img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', label: 'EXPLORE' },
];

const defaultModelImg = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80';

const monoFont = { fontFamily: "'Space Mono', monospace" };

const Collection = () => {
  const [selectedImg, setSelectedImg] = useState(defaultModelImg);

  return (
    <div className="w-screen h-screen flex border border-gray-300" style={monoFont}>
      {/* Left Side */}
      <div className="w-1/2 h-full flex flex-col justify-between border-r border-gray-300 bg-white relative">
        {/* Top Left Brand */}
        <div className="absolute top-4 left-6 text-xs font-bold tracking-widest" style={monoFont}>
          BALENCIAGA
        </div>
        {/* Center Heading */}
        <div className="flex flex-col items-center justify-center flex-1">
          <h1
            className="text-[7vw] md:text-[5vw] font-extrabold uppercase text-black text-center leading-none"
            style={{ ...monoFont, letterSpacing: '0.04em', lineHeight: 1.05 }}
          >
            EXPLORE OUR<br />COLLABORATIONS
          </h1>
          <div className="text-xs mt-4 mb-2 text-center" style={monoFont}>
            [balenci x onyx]
          </div>
        </div>
        {/* Bottom Model Grid */}
        <div className="w-full px-4 pb-4">
          <div className="flex flex-row items-end justify-between">
            {collabModels.map((m, i) => (
              <div key={i} className="flex flex-col items-center w-16">
                <img
                  src={m.img}
                  alt={m.label}
                  className="w-12 h-20 object-contain cursor-pointer border border-gray-200"
                  onClick={() => setSelectedImg(m.img)}
                  style={{ filter: 'none', background: '#fff' }}
                />
                <span className="text-[10px] text-center mt-1" style={monoFont}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-1/2 h-full relative bg-white">
        {/* Top Nav */}
        <div className="flex justify-between items-start px-8 pt-6">
          <div className="flex flex-col gap-1 text-[12px] leading-tight" style={monoFont}>
            <span className="underline">balenci x onyx</span>
            <span>men</span>
            <span>women</span>
            <span>new arrivals</span>
            <span>explore</span>
          </div>
        </div>
        {/* Model Image */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center" style={{height: "80%"}}>
          <img
            src={selectedImg}
            alt="Model"
            className="max-h-[80vh] object-contain"
            style={{ filter: 'none', background: '#fff' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;