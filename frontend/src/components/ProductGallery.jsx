import React from 'react';

const ProductGallery = ({ images, mainImage, setMainImage }) => (
  <div className="flex flex-col items-center w-full md:w-1/2">
    <div className="w-full aspect-square overflow-hidden mb-4">
      <img src={mainImage} alt="Main" className=" rounded-xl object-cover w-full h-full" />
    </div>
    <div className="flex gap-4">
      {images.map((img, idx) => (
        <button
          key={img}
          onClick={() => setMainImage(img)}
          className={`w-20 h-20 overflow-hidden border-2 rounded-lg ${mainImage === img ? 'border-black' : 'border-gray-200'}`}
        >
          <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
        </button>
      ))}
    </div>
  </div>
);

export default ProductGallery; 