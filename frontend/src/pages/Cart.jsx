import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import binIcon from "../assets/bin_icon.png";
import backIcon from "../assets/cross_icon.png"; // Replace with a left arrow if you have one
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const light = {
  bg: "#fff",
  card: "#f7f7f7",
  accent: "#222",
  accent2: "#f3f4f6",
  accent3: "#e5e7eb",
  text: "#222",
  shadow: "0 4px 24px #0001",
  border: "#e5e7eb"
};

const steps = [
  { label: "Cart", path: "/cart" },
  { label: "Information", path: "/placeorder" },
  { label: "Shipping", path: "/placeorder" },
  { label: "Payment", path: "/placeorder" }
];

const StepProgressBar = ({ currentStep }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 32, marginTop: 0, justifyContent: "center" }}>
    {steps.map((step, idx) => {
      const isActive = idx === currentStep;
      const isCompleted = idx < currentStep;
      return (
        <React.Fragment key={step.label}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: isActive ? "#111" : isCompleted ? "#1a936f" : "#e5e7eb",
              color: isActive || isCompleted ? "#fff" : "#888",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 16, border: isActive ? "2px solid #111" : "2px solid #e5e7eb",
              transition: "background 0.2s"
            }}>
              {isCompleted ? "✓" : idx + 1}
            </div>
            <span style={{
              marginTop: 6,
              fontSize: 13,
              color: isActive ? "#111" : "#888",
              fontWeight: isActive ? 700 : 500,
              textAlign: "center"
            }}>{step.label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div style={{
              flex: 1,
              height: 3,
              background: idx < currentStep ? "#1a936f" : "#e5e7eb",
              margin: "0 8px",
              borderRadius: 2,
              minWidth: 32
            }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const Cart = () => {
  const { cart, currency, removeFromCart, increaseQuantity, decreaseQuantity, delivery_fees } = useContext(ShopContext);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");

  const cartIsEmpty = cart.length === 0;
  const total = cart.reduce(
    (sum, item) => sum + (item.details?.price || 0) * item.quantity,
    0
  );
  const shippingFee = delivery_fees || 10;

  return (
    <div style={{
      background: light.bg,
      minHeight: "100vh",
      fontFamily: "'Quicksand', 'Poppins', 'Arial', sans-serif",
      padding: "2.5rem 0"
    }}>
      {/* Back Button */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <button
          type="button"
          onClick={() => navigate('/place-order')}
          style={{
            background: "none",
            border: "none",
            color: "#111",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <span style={{ fontSize: 22, display: "inline-block", transform: "translateY(1px)" }}>←</span>
          Place Order
        </button>

        {/* Progress Bar */}
        <StepProgressBar currentStep={0} />

        <div style={{
          display: "flex", gap: 40
        }}>
        {/* Cart Table */}
        <div style={{ flex: 2 }}>
          <h2 style={{
            marginBottom: 24, fontWeight: 700, fontSize: 28, letterSpacing: 0.5,
            color: light.text
          }}>
            Your Cart <span style={{ color: light.accent, fontSize: 18, fontWeight: 500 }}>({cart.length} Items)</span>
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 0.5fr", alignItems: "center",
            borderBottom: `2px solid ${light.border}`, paddingBottom: 12, fontWeight: 600, color: "#888", fontSize: 17
          }}>
            <span>Product</span>
            <span style={{ textAlign: "center" }}>Quantity</span>
            <span style={{ textAlign: "right" }}>Price</span>
            <span></span>
          </div>
          {cartIsEmpty ? (
            <div style={{ textAlign: "center", margin: "3rem 0" }}>
              <h3 style={{ color: light.accent }}>Your cart is empty</h3>
              <p style={{ color: "#aaa" }}>Looks like you haven’t added anything yet.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.id + item.size + idx}
                style={{
                  display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 0.5fr", alignItems: "center",
                  background: light.card, borderRadius: 18, margin: "22px 0", boxShadow: light.shadow,
                  padding: "26px 0 26px 18px", border: `1.5px solid ${light.border}`,
                  transition: "box-shadow 0.2s"
                }}
              >
                {/* Product Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <img
                    src={item.details?.image}
                    alt={item.details?.name}
                    style={{
                      width: 70, height: 70, objectFit: "cover", borderRadius: 14,
                      border: `2px solid ${light.accent3}`, boxShadow: light.shadow
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: light.text }}>{item.details?.name}</div>
                    {/* Show product size */}
                    <div style={{ fontSize: 15, color: light.accent, fontWeight: 600, margin: "4px 0" }}>
                      Size: {item.size}
                    </div>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <button style={{
                    width: 32, height: 32, borderRadius: 10, border: "none", background: light.accent3, fontSize: 20, cursor: "pointer",
                    fontWeight: 700, transition: "background 0.2s", boxShadow: "0 1px 2px #0001"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = light.accent}
                  onMouseOut={e => e.currentTarget.style.background = light.accent3}
                  onClick={() => increaseQuantity(item.id, item.size)}
                  >+
                  </button>
                  <span style={{ minWidth: 28, textAlign: "center", fontWeight: 600, fontSize: 17, color: light.text }}>{item.quantity}</span>
                  <button style={{
                    width: 32, height: 32, borderRadius: 10, border: "none", background: light.accent3, fontSize: 20, cursor: "pointer",
                    fontWeight: 700, transition: "background 0.2s", boxShadow: "0 1px 2px #0001"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = light.accent}
                  onMouseOut={e => e.currentTarget.style.background = light.accent3}
                  onClick={() => decreaseQuantity(item.id, item.size)}
                  >-
                  </button>
                </div>
                {/* Price */}
                <div style={{ textAlign: "right", fontWeight: 700, fontSize: 20, color: light.text, paddingRight: 18 }}>
                  {currency}{((item.details?.price || 0) * item.quantity).toFixed(2)}
                </div>
                {/* Delete Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <button
                    style={{
                      background: light.accent2,
                      border: "none",
                      cursor: "pointer",
                      padding: 8,
                      borderRadius: 30,
                      boxShadow: "0 2px 8px #0001",
                      transition: "background 0.2s, box-shadow 0.2s"
                    }}
                    title="Remove from cart"
                    onMouseOver={e => e.currentTarget.style.background = light.accent3}
                    onMouseOut={e => e.currentTarget.style.background = light.accent2}
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <img
                      src={binIcon}
                      alt="Delete"
                      style={{ width: 22, height: 22, filter: "grayscale(1) brightness(0.7)", transition: "filter 0.2s" }}
                      onMouseOver={e => (e.currentTarget.style.filter = "none")}
                      onMouseOut={e => (e.currentTarget.style.filter = "grayscale(1) brightness(0.7)")}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Sidebar */}
        <div style={{
          flex: 1,
          background: light.card,
          borderRadius: 22,
          padding: 36,
          minWidth: 320,
          maxWidth: 370,
          height: "fit-content",
          boxShadow: light.shadow,
          border: `1.5px solid ${light.border}`,
          position: "sticky",
          top: 40
        }}>
          {/* Coupon */}
          <div>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 17, color: light.text }}>Coupon</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "2px solid #222",
                  borderRight: "none",
                  borderRadius: "10px 0 0 10px",
                  fontSize: 16,
                  background: light.bg,
                  height: 44,
                  outline: "none"
                }}
              />
              <button
                style={{
                  background: "#fff",
                  border: "2px solid #222",
                  borderLeft: "none",
                  color: "#222",
                  borderRadius: "0 10px 10px 0",
                  fontSize: 16,
                  fontWeight: 700,
                  height: 44,
                  width: 70,
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "#222";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#222";
                }}
                onClick={() => {
                  if (coupon.trim()) {
                    alert(`Coupon applied: ${coupon}`);
                  } else {
                    alert("Please enter a coupon code.");
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
          {/* Price Details */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 17, color: light.text }}>Price Details</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 15 }}>
              <span>Product price</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 15 }}>
              <span>Shipping</span>
              <span>{currency}{shippingFee.toFixed(2)}</span>
            </div>
            <div style={{ borderTop: `1.5px solid ${light.border}`, margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 22, color: light.text }}>
              <span>Total Price</span>
              <span>{currency}{(total + shippingFee).toFixed(2)}</span>
            </div>
          </div>
          <button style={{
            width: "100%",
            padding: "16px 0",
            background: `linear-gradient(90deg, ${light.accent} 60%, ${light.accent3} 100%)`,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 20,
            cursor: "pointer",
            boxShadow: light.shadow,
            letterSpacing: 1,
            transition: "background 0.2s, color 0.2s"
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = `linear-gradient(90deg, ${light.accent3} 60%, ${light.accent} 100%)`;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = `linear-gradient(90deg, ${light.accent} 60%, ${light.accent3} 100%)`;
            e.currentTarget.style.color = "#fff";
          }}
          onClick={() => navigate('/place-order')}
          >
            Proceed
          </button>
        </div>
      </div>
      </div>
      {/* Small Footer */}
      <footer style={{
        width: '100%',
        textAlign: 'center',
        padding: '18px 0 10px 0',
        fontSize: 14,
        color: '#888',
        background: 'transparent',
        letterSpacing: 0.5,
        marginTop: 40
      }}>
        © {new Date().getFullYear()} LOYAN. All rights reserved.
      </footer>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default Cart;

