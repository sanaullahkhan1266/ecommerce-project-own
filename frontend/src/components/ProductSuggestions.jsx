import React from 'react';

const ProductSuggestions = ({ suggestions, addToCart, toast }) => {
  const handleAddToCart = (s) => {
    // For suggestions, pick first available size if any
    const size = s.sizes && s.sizes.length > 0 ? s.sizes[0] : null;
    if (!size) {
      toast.error('No size available for this product!');
      return;
    }
    addToCart(s.id, size, {
      name: s.name,
      price: s.price,
      image: s.img,
      description: s.description || '',
    });
    toast.success(`Added ${s.name} (Size: ${size}) to cart!`);
  };

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light text-gray-800 mb-2">You might also like</h2>
        <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {suggestions.map(s => (
          <div key={s.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-50">
              <img 
                src={s.img} 
                alt={s.name} 
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Subtle Discount Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                -{s.discount}% off
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6">
              <h3 className="font-medium text-gray-800 mb-2 text-sm">
                {s.name}
              </h3>
              {/* Sizes */}
              {s.sizes && s.sizes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.sizes.map(size => (
                    <span
                      key={size}
                      className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold border border-gray-300"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.round(s.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 text-xs ml-1">({s.rating})</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium text-gray-900">${s.price}</span>
                <span className="text-sm text-gray-400 line-through">${s.oldPrice}</span>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300 text-sm"
                onClick={() => handleAddToCart(s)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions; 