import React, { useState } from 'react';

const ProductReviewSection = ({ rating, reviews, featuredReview }) => {
  const [showInput, setShowInput] = useState(false);
  const [userReview, setUserReview] = useState('');

  const handleAddReviewClick = () => setShowInput(true);
  const handleInputChange = (e) => setUserReview(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to your backend later
    setUserReview('');
    setShowInput(false);
    alert('Thank you for your review! (This is a demo)');
  };

  return (
    <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-sm border border-gray-100">
      {/* Rating Summary */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gray-800 mb-1">{rating}<span className="text-xl text-gray-400">/5</span></div>
        <div className="text-gray-400 text-xs mb-4">{reviews} new reviews</div>
        <div className="flex flex-col gap-2 mt-2 w-full max-w-xs">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-yellow-400 text-base">★</span>
              <span className="text-gray-400 text-xs">{star}</span>
              <div className="bg-gray-100 rounded-full h-2 w-28 overflow-hidden">
                <div
                  className="bg-yellow-200 h-2 rounded-full transition-all"
                  style={{
                    width: `${rating >= star ? 100 : rating > star-1 ? (rating-(star-1))*100 : 0}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Add Review Button */}
        {!showInput && (
          <button
            className="mt-6 px-5 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
            onClick={handleAddReviewClick}
          >
            Add Your Review
          </button>
        )}
        {/* Review Input */}
        {showInput && (
          <form onSubmit={handleSubmit} className="mt-6 w-full flex flex-col items-center gap-2">
            <textarea
              className="w-full max-w-xs rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 resize-none"
              rows={3}
              placeholder="Write your review here..."
              value={userReview}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-yellow-400 text-white text-sm font-semibold hover:bg-yellow-500 transition"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-300 transition"
                onClick={() => setShowInput(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Featured Review Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md shadow border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-lg">{'★'.repeat(featuredReview.stars)}</span>
            <span className="font-semibold text-gray-700 text-sm">{featuredReview.name}</span>
            <span className="text-gray-300 text-xs ml-auto">{featuredReview.date}</span>
          </div>
          <div className="text-gray-600 text-base italic leading-relaxed font-light">
            “{featuredReview.text}”
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection; 