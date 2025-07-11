import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

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
              background: isActive || isCompleted ? "#111" : "#e5e7eb",
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
              background: idx < currentStep ? "#111" : "#e5e7eb",
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

const Orders = () => {
  const { cart, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const cartIsEmpty = cart.length === 0;
  const total = cart.reduce((sum, item) => sum + (item.details?.price || 0) * item.quantity, 0);

  const handleTrackOrder = () => {
    alert('Order tracking coming soon!');
  };

  return (
    <div style={{ minHeight: '60vh', padding: '2rem 0', background: '#f6f8fa', fontFamily: "'Quicksand', 'Poppins', 'Arial', sans-serif" }}>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
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
        Back
      </button>
      {/* Progress Bar: all steps completed */}
      <StepProgressBar currentStep={steps.length} />
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #0001', padding: 32, border: '1.5px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ display: 'inline-block', width: 18, height: 18, borderRadius: '50%', background: '#1a936f', marginRight: 6 }}></span>
          <span style={{ color: '#1a936f', fontWeight: 700, fontSize: 20 }}>Ready for Shipment</span>
        </div>
        {/* Track Order Button */}
        <button
          onClick={handleTrackOrder}
          style={{
            background: '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: 17,
            border: 'none',
            borderRadius: 10,
            padding: '12px 32px',
            marginBottom: 28,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s, color 0.2s',
            display: 'inline-block',
          }}
        >
          Track Order
        </button>
        <h2 style={{ fontWeight: 800, fontSize: 32, color: '#111', marginBottom: 18 }}>Your Order</h2>
        {cartIsEmpty ? (
          <div style={{ color: '#888', fontSize: 18, textAlign: 'center', margin: '3rem 0' }}>No products found in your order.</div>
        ) : (
          <>
            <div style={{
              display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr", alignItems: "center",
              borderBottom: `2px solid #e5e7eb`, paddingBottom: 12, fontWeight: 600, color: "#888", fontSize: 17, marginBottom: 10
            }}>
              <span>Product</span>
              <span style={{ textAlign: "center" }}>Quantity</span>
              <span style={{ textAlign: "right" }}>Price</span>
            </div>
            {cart.map((item, idx) => (
              <div
                key={item.id + item.size + idx}
                style={{
                  display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr", alignItems: "center",
                  background: '#f7f7f7', borderRadius: 14, margin: "18px 0", boxShadow: '0 1px 4px #0001',
                  padding: "18px 0 18px 14px", border: `1.5px solid #e5e7eb`,
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
                      border: `2px solid #e5e7eb`, boxShadow: '0 1px 2px #0001'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>{item.details?.name}</div>
                    <div style={{ fontSize: 15, color: '#1a936f', fontWeight: 600, margin: "4px 0" }}>
                      Size: {item.size}
                    </div>
                  </div>
                </div>
                {/* Quantity */}
                <div style={{ textAlign: "center", fontWeight: 600, fontSize: 17, color: '#222' }}>{item.quantity}</div>
                {/* Price */}
                <div style={{ textAlign: "right", fontWeight: 700, fontSize: 20, color: '#222', paddingRight: 18 }}>
                  {currency}{((item.details?.price || 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 800, fontSize: 22, color: '#111', marginTop: 24 }}>
              <span style={{ marginRight: 18 }}>Total:</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </>
        )}
        <p style={{ color: '#444', fontSize: 17, marginTop: 32, textAlign: 'center' }}>You will receive a tracking number once your order is shipped.<br/>Thank you for shopping with us!</p>
      </div>
    </div>
  )
}

export default Orders
