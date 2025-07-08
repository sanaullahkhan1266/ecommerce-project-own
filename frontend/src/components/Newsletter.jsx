import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
    setEmail('');
    setAgreed(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full flex justify-center items-center py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-2xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-2xl z-0" />
      <div className="max-w-xl w-full bg-white/90 shadow-2xl border border-gray-100 rounded-3xl p-10 flex flex-col items-center text-center z-10 relative">
        <div className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">Join 10,000+ subscribers</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
          Stay in the Loop
        </h2>
        <p className="text-gray-600 mb-6 text-base md:text-lg" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
          Subscribe to our newsletter for exclusive offers, new arrivals, and the latest updates.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none transition-all duration-200 bg-white shadow-sm hover:shadow-lg"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            disabled={submitted}
          />
          <button
            type="submit"
            disabled={!agreed || submitted}
            className={`px-8 py-3 rounded-full font-semibold uppercase tracking-wide shadow-md transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 ${agreed && !submitted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Subscribe
          </button>
        </form>
        <label className="flex items-center gap-2 mt-4 text-xs text-gray-500 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="accent-blue-600 w-4 h-4 rounded"
            disabled={submitted}
          />
          I agree to receive emails and accept the privacy policy.
        </label>
        {submitted && (
          <div className="mt-6 flex flex-col items-center animate-fade-in">
            <svg className="w-12 h-12 text-green-500 mb-2 animate-bounce-in" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity=".2"/><path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-green-600 font-semibold text-base">Thank you for subscribing!</div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); } }
        .animate-bounce-in { animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-in; }
      `}</style>
    </div>
  );
};

export default Newsletter; 