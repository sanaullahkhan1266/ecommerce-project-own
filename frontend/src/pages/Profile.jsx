import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, isAuthenticated, logout } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f6f8fa", 
      fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
      padding: '20px'
    }}>
      <ToastContainer position="top-center" autoClose={1800} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        background: '#fff', 
        borderRadius: 20,
        padding: 40,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 40,
          paddingBottom: 20,
          borderBottom: '2px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={assets.logo} alt="logo" style={{ height: 40, width: 'auto', marginRight: 12, borderRadius: 8 }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: "#222", letterSpacing: 1, fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>LOYAN</span>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#fff',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'box-shadow 0.18s, border 0.18s',
              fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: 14
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 18px #0002'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px #0001'}
          >
            Back to Home
          </button>
        </div>

        {/* Profile Content */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%', 
            margin: '0 auto 20px',
            overflow: 'hidden',
            border: '4px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc'
          }}>
            {user.picture ? (
              <img 
                src={user.picture} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ 
                fontSize: 48, 
                color: '#64748b',
                fontWeight: 600,
                fontFamily: 'Montserrat, Oswald, Arial, sans-serif'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            marginBottom: 8, 
            color: '#222',
            fontFamily: 'Montserrat, Oswald, Arial, sans-serif'
          }}>
            {user.name}
          </h1>
          
          <p style={{ 
            fontSize: 16, 
            color: '#64748b', 
            marginBottom: 20,
            fontFamily: 'Roboto, Open Sans, Arial, sans-serif'
          }}>
            {user.email}
          </p>

          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            background: '#f1f5f9',
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 14,
            color: '#475569',
            fontWeight: 600,
            fontFamily: 'Roboto, Open Sans, Arial, sans-serif'
          }}>
            <span style={{ marginRight: 8 }}></span>
            Signed in with {user.provider === 'google' ? 'Google' : 'Email'}
          </div>
        </div>

        {/* Account Info */}
        <div style={{ 
          background: '#f8fafc', 
          borderRadius: 16, 
          padding: 24, 
          marginBottom: 30 
        }}>
          <h3 style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            marginBottom: 16, 
            color: '#222',
            fontFamily: 'Montserrat, Oswald, Arial, sans-serif'
          }}>
            Account Information
          </h3>
          
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 14, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>User ID:</span>
              <span style={{ color: '#222', fontSize: 14, fontWeight: 500, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>{user.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 14, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Login Method:</span>
              <span style={{ color: '#222', fontSize: 14, fontWeight: 500, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
                {user.provider === 'google' ? 'Google OAuth' : 'Email & Password'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 14, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Member Since:</span>
              <span style={{ color: '#222', fontSize: 14, fontWeight: 500, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
                {new Date(user.loginTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/orders')}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '14px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              fontFamily: 'Roboto, Open Sans, Arial, sans-serif'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            View Orders
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              background: '#fff',
              color: '#dc2626',
              border: '1.5px solid #dc2626',
              borderRadius: 12,
              padding: '14px 24px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, transform 0.1s',
              fontFamily: 'Roboto, Open Sans, Arial, sans-serif'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#dc2626';
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 