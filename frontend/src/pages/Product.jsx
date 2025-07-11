import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Navbar from './../components/Navbar';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [product, setProduct] = useState(null);
  const [clickedSize, setClickedSize] = useState(null);

  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(Array.isArray(foundProduct.image) ? foundProduct.image[0] : foundProduct.image);
      // Set default size to first available size
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      toast.error('Product not found!');
    }
  }, [id, products]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setClickedSize(size);
    setTimeout(() => setClickedSize(null), 2000);
  };

  const handleAddToCart = (size) => {
    if (!product) return;
    if (!size) {
      toast.error('Please select a size before adding to cart!');
      return;
    }
    addToCart(product._id, size, {
      name: product.name,
      price: product.price,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      description: product.description
    });
    toast.success(`Added ${product.name} (Size: ${size}) to cart!`);
  };

  // Show loading if product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">Product not found</div>
            <div className="text-gray-600">The product you're looking for doesn't exist.</div>
          </div>
        </div>
      </>
    );
  }

  // Generate suggestions based on same category
  const suggestions = products
    .filter(p => p._id !== id && p.category === product.category)
    .slice(0, 4)
    .map(p => ({
      id: p._id,
      img: Array.isArray(p.image) ? p.image[0] : p.image,
      name: p.name,
      rating: 4.5,
      price: p.price,
      oldPrice: p.price * 1.2, // 20% markup for old price
      discount: 20,
    }));

  // Helper: get up to 3 images, always as an array
  const images = Array.isArray(product?.image) ? product.image : [product?.image];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center py-10">
        <div className="rounded-lg flex flex-col md:flex-row w-full max-w-6xl items-start">
          {/* Left: Product Info */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-start">
            <div>
              <button
                className="mb-8 flex items-center gap-2 text-xl font-bold text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
                onClick={() => window.history.back()}
              >
                <span className="text-2xl">&larr;</span>
                <span>Back</span>
              </button>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl mt-3 font-semibold">${product.price}</span>
                <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-xs text-green-600 font-semibold">20% OFF</span>
              </div>
              {/* Size Selection */}
              <div className="mb-6">
                <div className="font-semibold mb-2">Size:</div>
                <div className="flex gap-2">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeClick(size)}
                      className={`rounded-full px-4 py-1 text-sm font-medium transition ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {clickedSize && (
                  <div className="mt-2 text-green-600 text-sm">
                    ✓ Size {clickedSize} selected!
                  </div>
                )}
              </div>
              {/* Product Overview - all details */}
              <div className="mb-8">
                <div className="font-bold text-lg mb-3">Product overview</div>
                <div className="text-gray-900 text-base leading-relaxed p-6 text-lg rounded-lg space-y-2">
                  <div><span className="font-semibold">Description:</span> {product.description}</div>
                  {product.sku && (
                    <div><span className="font-semibold">SKU:</span> {product.sku}</div>
                  )}
                  {product.material && (
                    <div><span className="font-semibold">Material:</span> {product.material}</div>
                  )}
                  {product.care && (
                    <div><span className="font-semibold">Care Instructions:</span> {product.care}</div>
                  )}
                  {product.origin && (
                    <div><span className="font-semibold">Country of Origin:</span> {product.origin}</div>
                  )}
                  {/* Add more fields as needed */}
                </div>
              </div>
              {/* Delivery, Return & Exchange Policy */}
              <div className="mb-8">
                <div className="font-bold text-lg mb-3">Delivery, Return &amp; Exchange Policy</div>
                <div className="text-gray-700 text-base leading-relaxed text-lg">
                  Delivery in 3-4 working days. Easy 7-day return &amp; exchange available. Product must be unused and in original packaging for returns. For more details, see our <a href="#" className="underline hover:text-black">Return Policy</a>.
                </div>
              </div>
              {/* Action Button */}
              <div className="mt-8">
                <button
                  className="w-full bg-black text-white py-4 text-lg rounded-xl font-bold hover:bg-gray-800 transition"
                  onClick={() => handleAddToCart(selectedSize)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
          {/* Right: Product Images - main image with thumbnails on the right */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-start">
            <div className="flex w-full items-start">
              {/* Main Image with accent background and bigger size */}
              <div className="flex-1 flex items-start justify-center bg-light-accent2" style={{ borderRadius: '1rem', minHeight: 520 }}>
                <img
                  src={mainImage}
                  alt={product.name}
                  className="object-contain w-full rounded-xl"
                  style={{ maxWidth: 520, maxHeight: 520 }}
                />
              </div>
              {/* Thumbnails on the right (vertical on desktop) */}
              <div className="hidden md:flex flex-col gap-4 ml-4">
                {images.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-20 h-28 overflow-hidden rounded-xl ${mainImage === img ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setMainImage(img)}
                    style={{ minWidth: 0 }}
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="object-contain w-full h-full rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Thumbnails below main image on mobile */}
            <div className="flex md:hidden gap-4 mt-4 w-full justify-center">
              {images.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  className={`w-20 h-28 overflow-hidden rounded-full ${mainImage === img ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setMainImage(img)}
                  style={{ minWidth: 0 }}
                >
                  <img
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="object-contain w-full h-full rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Small Footer */}
      <div className="mt-16 pt-4 border-t border-gray-00 text-center">
        <p className="text-black text-sm">
          © 2024 Loyan.co . All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2 mb-3 text-xs text-black">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default Product;
