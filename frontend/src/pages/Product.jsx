import React, { useState } from 'react';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const Product = () => {
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-lg p-8">
          {/* Gallery */}
          <div className="flex-1">
            <img
              src="/src/assets/p_img1.png"
              alt="Loose Fit Hoodie"
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="flex gap-2">
              <img src="/src/assets/p_img1.png" alt="" className="w-20 h-20 object-cover rounded-lg border" />
              <img src="/src/assets/p_img2.png" alt="" className="w-20 h-20 object-cover rounded-lg border" />
              <img src="/src/assets/p_img3.png" alt="" className="w-20 h-20 object-cover rounded-lg border" />
              <img src="/src/assets/p_img4.png" alt="" className="w-20 h-20 object-cover rounded-lg border" />
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-sm text-gray-500">Man Fashion</span>
            <h1 className="text-3xl font-bold">Loose Fit Hoodie</h1>
            <p className="text-2xl font-semibold text-gray-800">$24.99</p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span>Order in <b>02:30:25</b> to get next day delivery</span>
            </div>
            {/* Size Selector */}
            <div>
              <div className="mb-2 font-medium">Select Size</div>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Add to Cart */}
            <button className="mt-4 w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
              Add to Cart
            </button>
            {/* Description & Shipping */}
            <div className="mt-6">
              <h2 className="font-semibold mb-1">Description & Fit</h2>
              <p className="text-gray-600 text-sm">
                Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined, drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Wide ribbing at cuffs and hem. Soft, brushed inside.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Shipping</h2>
              <div className="flex gap-6 text-sm text-gray-600">
                <div>
                  <div>Discount</div>
                  <div className="font-bold">Disc 50%</div>
                </div>
                <div>
                  <div>Package</div>
                  <div className="font-bold">Regular Package</div>
                </div>
                <div>
                  <div>Delivery Time</div>
                  <div className="font-bold">3-4 Working Days</div>
                </div>
                <div>
                  <div>Est. Arrival</div>
                  <div className="font-bold">10-12 October 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-10 flex flex-col md:flex-row gap-10">
          {/* Rating Summary */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">4.5</div>
            <div className="text-gray-500 mb-2">/ 5</div>
            <div className="text-sm text-gray-400">(50 New Reviews)</div>
            <div className="mt-4 w-full">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded">
                    <div className="bg-yellow-400 h-2 rounded" style={{ width: `${star * 20}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{star}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Featured Review */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Alex Mathio</span>
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-xs text-gray-400 ml-auto">13 Oct 2024</span>
              </div>
              <div className="text-gray-700 text-sm">
                "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world."
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Suggestion Card */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <img src={`/src/assets/p_img${i + 1}.png`} alt="" className="w-32 h-32 object-cover rounded mb-2" />
                <div className="font-semibold mb-1">Product Name {i}</div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                  ★★★★☆
                </div>
                <div className="text-gray-800 font-bold mb-1">${100 + i * 20}</div>
                <div className="text-xs text-gray-400 line-through">${120 + i * 20}</div>
                <div className="text-xs text-red-500">-20%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
