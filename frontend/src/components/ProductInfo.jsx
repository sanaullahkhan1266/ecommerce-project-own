import React from 'react';

const ProductInfo = ({
  title, price, sizes, selectedSize, setSelectedSize, description, shipping, onAddToCart
}) => (
  <div className="flex-1 flex flex-col gap-6">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-xl font-semibold text-black mt-2">${price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mt-1">Order in <span className="font-semibold text-blue-600">02:30:25</span> to get next day delivery</p>
    </div>
    <div>
      <div className="flex gap-2 mt-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border text-lg font-medium transition rounded-full
              ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-black'}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
    <button 
      className="mt-4 w-full py-3 bg-black text-white font-semibold text-lg hover:bg-gray-900 transition rounded-lg shadow"
      onClick={() => onAddToCart && onAddToCart(selectedSize)}
    >Add to Cart</button>
    <div className="mt-6 bg-gray-50 p-4">
      <h3 className="font-semibold text-gray-800 mb-1">Description & Fit</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    <div className="mt-2 bg-gray-50 p-4 flex flex-col gap-2">
      <h3 className="font-semibold text-gray-800 mb-1">Shipping</h3>
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        <span>Discount: <span className="text-blue-600 font-semibold">{shipping.discount}</span></span>
        <span>Package: {shipping.package}</span>
        <span>Delivery: {shipping.delivery}</span>
        <span>Est. Arrival: {shipping.arrival}</span>
      </div>
    </div>
  </div>
);

export default ProductInfo; 