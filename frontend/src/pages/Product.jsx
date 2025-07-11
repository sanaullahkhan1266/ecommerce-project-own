import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductReviewSection from '../components/ProductReviewSection';
import ProductSuggestions from '../components/ProductSuggestions';
import Navbar from './../components/Navbar';
import { toast } from 'react-toastify';

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-16">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row gap-12 bg-white p-10">
            <ProductGallery 
              images={Array.isArray(product.image) ? product.image : [product.image]} 
              mainImage={mainImage} 
              setMainImage={setMainImage} 
            />
            <ProductInfo
              title={product.name}
              price={product.price}
              sizes={product.sizes}
              selectedSize={selectedSize}
              setSelectedSize={handleSizeClick}
              description={product.description}
              shipping={{
                discount: 'Disc 50%',
                package: 'Regular Package',
                delivery: '3-4 Working Days',
                arrival: '10-12 October 2024',
              }}
              onAddToCart={handleAddToCart}
            />
          </div>
          {/* Size Selection Feedback */}
          {clickedSize && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
              <div className="text-green-800 font-semibold">
                ✓ Size {clickedSize} selected!
              </div>
              <div className="text-green-600 text-sm">
                You can now add this item to your cart with size {clickedSize}.
              </div>
            </div>
          )}
          <div className="mt-10">
            <ProductReviewSection
              rating={4.5}
              reviews={50}
              featuredReview={{
                name: 'Alex Mathio',
                stars: 5,
                date: '13 Oct 2024',
                text: 'NextGen\'s dedication to sustainability and ethical practices resonates strongly with today\'s consumers, positioning the brand as a responsible choice in the fashion world.',
              }}
            />
          </div>
          <div className="mt-10">
            <ProductSuggestions 
              suggestions={suggestions} 
              addToCart={addToCart}
              toast={toast}
            />
          </div>
          {/* Small Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © 2024 Loyan.co . All rights reserved.
              </p>
              <div className="flex justify-center gap-6 mt-2 text-xs text-gray-400">
                <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
