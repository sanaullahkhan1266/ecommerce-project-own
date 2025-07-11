import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid #e5e7eb',
  fontSize: 18,
  marginBottom: 0,
  outline: 'none',
  background: '#fff',
  color: '#222',
  fontWeight: 500,
  fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
};

const buttonStyle = {
  width: '100%',
  marginTop: 18,
  padding: '14px 0',
  background: '#111',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 12px #0001',
  letterSpacing: 1,
  transition: 'background 0.2s, color 0.2s',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
};

const googleButtonStyle = {
  width: '100%',
  marginTop: 18,
  padding: '14px 0',
  background: '#fff',
  color: '#222',
  border: '1.5px solid #e5e7eb',
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 12px #0001',
  letterSpacing: 0.5,
  transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
  fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const { login, googleLogin, loading, handleOAuthCode } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [focusField, setFocusField] = useState("");

  // Add this debug function
  const debugGoogleAuth = () => {
    console.log('=== Google Auth Debug ===');
    console.log('Client ID:', '366985503712-f5c03imfa39a1dvo2t23u0c7lcmsjmnm.apps.googleusercontent.com');
    console.log('Current Origin:', window.location.origin);
    console.log('User Agent:', navigator.userAgent);
    console.log('Is HTTPS:', window.location.protocol === 'https:');
    console.log('========================');
  };

  // Call debug on component mount
  useEffect(() => {
    debugGoogleAuth();
  }, []);

  // Debug current URL on component mount
  useEffect(() => {
    console.log('=== Login Page Debug Info ===');
    console.log('Current URL:', window.location.href);
    console.log('Origin:', window.location.origin);
    console.log('Protocol:', window.location.protocol);
    console.log('Host:', window.location.host);
    console.log('Port:', window.location.port);
    console.log('Pathname:', window.location.pathname);
    console.log('Search:', window.location.search);
    console.log('================================');
  }, []);

  // Check for OAuth code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    
    if (code) {
      console.log('OAuth code found in URL:', code);
      handleOAuthCode(code).then(() => {
        navigate('/profile');
      });
    }
  }, [location.search, handleOAuthCode, navigate]);

  // Button dynamic style
  const dynamicButtonStyle = {
    ...buttonStyle,
    background: btnHover ? (btnActive ? '#181818' : '#222') : '#111',
    transform: btnActive ? 'scale(0.97)' : btnHover ? 'scale(1.04)' : 'scale(1)',
    boxShadow: btnHover ? '0 4px 18px #0002' : '0 2px 12px #0001',
    transition: 'background 0.18s, color 0.18s, transform 0.13s, box-shadow 0.18s',
  };

  // Helper for input style
  const getInputStyle = (field) => ({
    ...inputStyle,
    border: focusField === field ? '1.5px solid #2563eb' : inputStyle.border,
    boxShadow: focusField === field ? '0 0 0 2px #2563eb22' : 'none',
    transition: 'color 0.18s, background 0.18s, font-weight 0.18s, border 0.18s, box-shadow 0.18s',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill all fields.");
      toast.error("Please fill all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setError("");
    
    try {
      if (isSignUp) {
        // Simulate sign up
        const userData = {
          id: Date.now().toString(),
          name: name,
          email: email,
          provider: 'email',
          loginTime: new Date().toISOString()
        };
        login(userData);
        toast.success("Sign up successful! Redirecting...");
        setTimeout(() => navigate("/profile"), 1200);
      } else {
        // Simulate login
        const userData = {
          id: Date.now().toString(),
          name: email.split('@')[0], // Use email prefix as name
          email: email,
          provider: 'email',
          loginTime: new Date().toISOString()
        };
        login(userData);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/profile"), 1200);
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('✅ Google login successful:', credentialResponse);
      await googleLogin(credentialResponse.credential);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (error) {
      console.error('❌ Google login error:', error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = (error) => {
    console.error('❌ Google OAuth error:', error);
    debugGoogleAuth(); // Debug info on error
    
    if (error.error === 'popup_closed_by_user') {
      toast.error("Login cancelled. Please try again.");
    } else if (error.error === 'access_denied') {
      toast.error("Access denied. Please try again.");
    } else if (error.error === 'invalid_client') {
      toast.error("Configuration error. Please contact support.");
    } else {
      toast.error(`Google login failed: ${error.error || 'Unknown error'}`);
    }
  };

  const handleGoogleLoginSimple = () => {
    const clientId = "366985503712-f5c03imfa39a1dvo2t23u0c7lcmsjmnm.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('openid profile email');
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline`;
    
    console.log('Redirecting to:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const handleGoogleLoginRedirect = () => {
    const clientId = "366985503712-f5c03imfa39a1dvo2t23u0c7lcmsjmnm.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('openid profile email');
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline`;
    
    console.log('Redirecting to Google OAuth:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f6f8fa", fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={1800} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      {/* Left: Login/SignUp Form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fff", position: 'relative' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            background: '#fff',
            border: '1.5px solid #e5e7eb',
            borderRadius: 10,
            boxShadow: '0 2px 8px #0001',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, border 0.18s',
            zIndex: 10,
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 18px #0002'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px #0001'}
          aria-label="Back"
        >
          {/* Use a left arrow SVG for clarity */}
          <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ width: 370, maxWidth: "90%", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
            <img src={assets.logo} alt="logo" style={{ height: 48, width: 'auto', marginRight: 12, borderRadius: 10 }} />
            <span style={{ fontWeight: 700, fontSize: 24, color: "#222", letterSpacing: 1, fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>LOYAN</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#222', letterSpacing: 1, fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          
          {/* Google Sign In Button */}
          <div style={{ marginBottom: 24 }}>
            <button
              onClick={handleGoogleLoginRedirect}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '12px',
                border: '1.5px solid #e5e7eb',
                background: '#fff',
                color: '#222',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
                boxShadow: '0 2px 12px #0001',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 18px #0002'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px #0001'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 24,
            color: '#666',
            fontSize: 14
          }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }}></div>
            <span style={{ margin: '0 16px', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }}></div>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 600, fontSize: 15, color: '#222', fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{ ...getInputStyle('name'), width: "100%", marginTop: 6, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                  required
                  onFocus={() => setFocusField('name')}
                  onBlur={() => setFocusField("")}
                />
              </div>
            )}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, fontSize: 15, color: '#222', fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ ...getInputStyle('email'), width: "100%", marginTop: 6, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                required
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField("")}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, fontSize: 15, color: '#222', fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  style={{ ...getInputStyle('password'), width: "100%", marginTop: 6, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
                  required
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField("")}
                />
                <span
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: "absolute", right: 14, top: 18, cursor: "pointer", fontSize: 17, color: "#888" }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
            {error && <div style={{ color: "#e11d48", marginBottom: 16, fontSize: 14, fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>{error}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{ 
                ...dynamicButtonStyle, 
                fontFamily: 'Montserrat, Oswald, Arial, sans-serif',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={() => !loading && setBtnHover(true)}
              onMouseLeave={() => { setBtnHover(false); setBtnActive(false); }}
              onMouseDown={() => !loading && setBtnActive(true)}
              onMouseUp={() => setBtnActive(false)}
            >
              {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
          </form>
          <div style={{ marginTop: 18, textAlign: "center", fontSize: 15, color: '#222', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
            {isSignUp ? (
              <>Already have an account? <span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer", fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }} onClick={() => setIsSignUp(false)}>Sign In</span></>
            ) : (
              <>Create an account? <span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer", fontFamily: 'Montserrat, Oswald, Arial, sans-serif' }} onClick={() => setIsSignUp(true)}>Sign Up</span></>
            )}
          </div>
        </div>
      </div>
      {/* Right: Interesting Full-Screen Image */}
      <div style={{
        flex: 1.2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        overflow: 'hidden',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
      }}>
        <img
          src={assets.p_img11}
          alt="Interesting Visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export default Login; 