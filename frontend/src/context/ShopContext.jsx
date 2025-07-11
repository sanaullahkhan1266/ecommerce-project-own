import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fees = 10;
    const [cart, setCart] = useState([]);

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
      products, currency, delivery_fees, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity
    }
    return(
        <ShopContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;