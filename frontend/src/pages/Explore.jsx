import React, { useContext, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const getUnique = (products, key) => {
  const values = products.flatMap((p) => Array.isArray(p[key]) ? p[key] : [p[key]]).filter(Boolean);
  return Array.from(new Set(values));
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price Low-High' },
  { value: 'price-desc', label: 'Price High-Low' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
];

const sortProducts = (products, sort) => {
  let sorted = [...products];
  switch (sort) {
    case 'newest':
      sorted.sort((a, b) => (b.date || 0) - (a.date || 0));
      break;
    case 'oldest':
      sorted.sort((a, b) => (a.date || 0) - (b.date || 0));
      break;
    case 'price-asc':
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-desc':
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  return sorted;
};

const Explore = () => {
  const { products } = useContext(ShopContext);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const sortRef = useRef(null);

  // Get unique filter values
  const categories = getUnique(products, 'category');
  const subCategories = getUnique(products, 'subCategory');
  const sizes = getUnique(products, 'sizes');
  const materials = getUnique(products, 'material');
  const minPrice = Math.min(...products.map(p => p.price || 0));
  const maxPrice = Math.max(...products.map(p => p.price || 0));

  // Filtering logic
  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(p.subCategory);
    const matchesSize = selectedSizes.length === 0 || (p.sizes && p.sizes.some(size => selectedSizes.includes(size)));
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(p.material);
    const matchesPrice = (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1];
    return matchesSearch && matchesCategory && matchesSubCategory && matchesSize && matchesMaterial && matchesPrice;
  });

  filtered = sortProducts(filtered, sort);

  const toggleFilter = (value, selected, setSelected) => {
    setSelected(selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setPriceRange([minPrice, maxPrice]);
  };

  // Close sort dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };
    if (showSort) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSort]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 pt-8 pb-4 gap-4">
          <span className="text-xs font-bold uppercase tracking-wide">{filtered.length} Products</span>
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto md:justify-end">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full shadow-sm border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/20 text-sm placeholder-gray-400 outline-none transition-all duration-200 bg-white"
                style={{ letterSpacing: '0.05em' }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/></svg>
              </span>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="uppercase text-xs font-semibold tracking-wide px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-200 shadow-none border border-black border-opacity-10"
            >
              Filters
            </button>
            {/* Custom Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSort((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-xs uppercase font-semibold tracking-wide hover:bg-gray-100 transition-all duration-200 min-w-[140px]"
              >
                {SORT_OPTIONS.find(opt => opt.value === sort)?.label || 'Sort'}
                <svg className={`w-4 h-4 transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {showSort && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 animate-fade-in">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setShowSort(false); }}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition-all duration-150 ${sort === opt.value ? 'bg-black text-white' : 'text-black'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Filter Sidebar/Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 transition-all duration-200" onClick={() => setShowFilters(false)} />
            {/* Sidebar - slide in from right */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white z-50 p-8 overflow-y-auto transition-transform duration-300 ease-in-out border-l border-gray-200 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex items-center justify-between mb-6">
                <div />
                <div className="flex items-center gap-4">
                  <button
                    className="uppercase text-xs font-bold text-black bg-gray-100 px-4 py-2 rounded-full hover:bg-black hover:text-white border border-black border-opacity-10 transition-all duration-200"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                  <button
                    className="text-2xl font-light hover:text-black hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 border border-black border-opacity-10"
                    onClick={() => setShowFilters(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
              <hr className="mb-6" />
              {/* Category */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">Category</div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <label key={cat} className="text-base cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                        className="hidden"
                      />
                      <span className={`inline-block px-3 py-2 ${selectedCategories.includes(cat) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="mb-6" />
              {/* SubCategory */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">SubCategory</div>
                <div className="flex flex-wrap gap-3">
                  {subCategories.map((sub) => (
                    <label key={sub} className="text-base cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(sub)}
                        onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)}
                        className="hidden"
                      />
                      <span className={`inline-block px-3 py-2 ${selectedSubCategories.includes(sub) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="mb-6" />
              {/* Size */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">Size</div>
                <div className="flex flex-wrap gap-4">
                  {sizes.map((size) => (
                    <label key={size} className="text-base cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        className="hidden"
                      />
                      <span className={`inline-block px-3 py-2 ${selectedSizes.includes(size) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="mb-6" />
              {/* Material */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">Material</div>
                <div className="flex flex-wrap gap-3">
                  {materials.map((mat) => (
                    <label key={mat} className="text-base cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleFilter(mat, selectedMaterials, setSelectedMaterials)}
                        className="hidden"
                      />
                      <span className={`inline-block px-3 py-2 ${selectedMaterials.includes(mat) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="mb-6" />
              {/* Price Range */}
              <div className="mb-8">
                <div className="uppercase text-xs font-bold mb-3">Price</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={minPrice}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 border border-gray-200 rounded px-2 py-1 text-xs"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 border border-gray-200 rounded px-2 py-1 text-xs"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">Min: {minPrice} | Max: {maxPrice}</div>
              </div>
            </div>
          </div>
        )}
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 pb-12">
          {filtered.map((product, idx) => (
            <Link to={`/product/${product._id}`} key={idx} className="bg-white flex flex-col  transition-all duration-200 cursor-pointer">
              <div className="w-full h-[320px] bg-gray-50 flex items-center justify-center overflow-hidden ">
                <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-200" />
              </div>
              <div className="mt-4 mb-2 px-2">
                <span className="block font-bold text-sm text-black text-left leading-tight">
                  {product.name}
                </span>
                {product.price && (
                  <span className="block text-xs text-black text-left mt-1">${product.price}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore; 