import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const currency = "$";
    const delivery_fees = 10;
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Check for existing authentication on app load
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Handle OAuth code from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            handleOAuthCode(code);
        }
    }, []);

    // Handle OAuth authorization code
    const handleOAuthCode = async (code) => {
        setLoading(true);
        try {
            // Exchange code for user info
            const userData = await exchangeCodeForUserInfo(code);
            
            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            setIsAuthenticated(true);
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            toast.success(`Welcome back, ${userData.name}!`);
            
            return userData;
        } catch (error) {
            console.error('OAuth code exchange error:', error);
            toast.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Exchange authorization code for user info
    const exchangeCodeForUserInfo = async (code) => {
        // For now, we'll simulate the user data
        // In a real app, you'd exchange the code for tokens with Google's servers
        const userData = {
            id: `google_${Date.now()}`,
            name: 'Google User', // This would come from Google's API
            email: 'user@example.com', // This would come from Google's API
            picture: null,
            provider: 'google',
            loginTime: new Date().toISOString()
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return userData;
    };

    // Google OAuth login (for popup flow)
    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            // Decode the JWT token to get user info
            const payload = JSON.parse(atob(credential.split('.')[1]));
            
            const userData = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: 'google',
                loginTime: new Date().toISOString()
            };

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            setIsAuthenticated(true);
            
            toast.success(`Welcome back, ${userData.name}!`);
            return userData;
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Login failed. Please try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Manual login (for existing functionality)
    const login = (userData = null) => {
        if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
    };

    // item: { id, size, quantity, details }
    const addToCart = (id, size, details) => {
        setCart(prevCart => {
            // Check if item with same id and size already exists
            const existingIndex = prevCart.findIndex(item => item.id === id && item.size === size);
            if (existingIndex !== -1) {
                // If exists, increase quantity
                const updatedCart = [...prevCart];
                updatedCart[existingIndex].quantity += 1;
                return updatedCart;
            } else {
                // If not, add new item
                return [
                    ...prevCart,
                    { id, size, quantity: 1, details }
                ];
            }
        });
    };

    // Remove item from cart by id and size
    const removeFromCart = (id, size) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size)));
    };

    // Increase quantity of a cart item by id and size
    const increaseQuantity = (id, size) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    // Decrease quantity of a cart item by id and size (min 1)
    const decreaseQuantity = (id, size) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === id && item.size === size && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    // Log cart to console whenever it changes
    useEffect(() => {
        console.log('Cart:', cart);
    }, [cart]);

    const value = {
        products, 
        currency, 
        delivery_fees, 
        cart, 
        addToCart, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        isAuthenticated, 
        user,
        loading,
        login, 
        logout,
        googleLogin,
        handleOAuthCode
    }
    
    return(
        <ShopContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ShopContext.Provider>
    )
}
export default ShopProvider;