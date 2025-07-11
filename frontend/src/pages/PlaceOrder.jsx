import React, { useContext, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from 'emailjs-com';
import axios from "axios";

// Payment method icons
const visaIcon = <svg width="28" height="18" viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#fff" stroke="#e5e7eb"/><text x="16" y="14" textAnchor="middle" fontSize="13" fill="#1a237e" fontWeight="bold">VISA</text></svg>;
const mcIcon = <svg width="28" height="18" viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#fff" stroke="#e5e7eb"/><circle cx="12" cy="10" r="6" fill="#ff9800"/><circle cx="20" cy="10" r="6" fill="#f44336"/><text x="16" y="15" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">MC</text></svg>;
const easypaisaIcon = (
  <img src="https://seeklogo.com/images/E/easypaisa-logo-6B8B6B6B6B-seeklogo.com.png" alt="Easypaisa" style={{ width: 28, height: 28, borderRadius: 6, background: "#fff" }} />
);
const jazzcashIcon = (
  <img src="https://seeklogo.com/images/J/jazzcash-logo-6B8B6B6B6B-seeklogo.com.png" alt="JazzCash" style={{ width: 28, height: 28, borderRadius: 6, background: "#fff" }} />
);
const bankIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#e5e7eb"/><path d="M4 10L12 5L20 10" stroke="#222" strokeWidth="2"/><rect x="6" y="10" width="12" height="7" rx="2" stroke="#222" strokeWidth="2"/><path d="M9 17V13" stroke="#222" strokeWidth="2"/><path d="M15 17V13" stroke="#222" strokeWidth="2"/></svg>
);

const light = {
  bg: "#f6f8fa",
  card: "#fff",
  accent: "#222",
  accent2: "#f3f4f6",
  accent3: "#e5e7eb",
  text: "#222",
  shadow: "0 2px 12px #0001",
  border: "#e5e7eb"
};

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid #e5e7eb',
  fontSize: 16,
  marginBottom: 0,
  outline: 'none',
  background: '#fff',
  color: '#222',
  fontWeight: 500
};

// Progress bar with 4 steps
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

const paymentMethods = [
  { value: "COD", label: "Cash on Delivery", icon: <span style={{ fontSize: 22 }}>💵</span> },
  { value: "Easypaisa", label: "Easypaisa", icon: easypaisaIcon },
  { value: "JazzCash", label: "JazzCash", icon: jazzcashIcon },
  { value: "BankTransfer", label: "Bank Transfer", icon: bankIcon },
  { value: "Card", label: "Credit/Debit Card", icon: <span style={{ display: "flex", gap: 2 }}>{visaIcon}{mcIcon}</span> }
];

// Custom option for react-select with flag
const customCountryOption = (props) => {
  const { data, innerProps, innerRef } = props;
  const code = data.value ? data.value.toLowerCase() : "";
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 8
      }}
    >
      {code && (
        <img
          src={`https://flagcdn.com/24x18/${code}.png`}
          alt={data.label}
          style={{ width: 24, height: 18, borderRadius: 3, objectFit: "cover", border: "1px solid #eee" }}
        />
      )}
      <span style={{ marginBottom: 2 }}>{data.label}</span>
    </div>
  );
};

const customCountrySingleValue = (props) => {
  const { data } = props;
  const code = data.value ? data.value.toLowerCase() : "";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10
      }}
    >
      {code && (
        <img
          src={`https://flagcdn.com/24x18/${code}.png`}
          alt={data.label}
          style={{ width: 24, height: 18, borderRadius: 3, objectFit: "cover", border: "1px solid #eee" }}
        />
      )}
      <span style={{ marginBottom: 2 }}>{data.label}</span>
    </div>
  );
};

const PlaceOrder = () => {
  const { cart, currency, delivery_fees, increaseQuantity, decreaseQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const shippingFee = delivery_fees || 10;
  const total = cart.reduce((sum, item) => sum + (item.details?.price || 0) * item.quantity, 0);

  const countryOptions = useMemo(() => countryList().getData(), []);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: { value: "PK", label: "Pakistan" },
    state: "",
    city: "",
    zip: "",
    notes: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [location, setLocation] = useState({ city: "", region: "", country: "", lat: null, lng: null });

  React.useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then(res => {
        setLocation({
          city: res.data.city,
          region: res.data.region,
          country: res.data.country_name,
          lat: res.data.latitude,
          lng: res.data.longitude
        });
      })
      .catch(() => {
        setLocation({ city: "", region: "", country: "", lat: null, lng: null });
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCountryChange = selected => {
    setForm({ ...form, country: selected });
  };

  const handlePhoneChange = phone => {
    setForm({ ...form, phone });
  };

  // Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Add this check for email
    if (!form.email || form.email.trim() === '') {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    if (!form.name || !form.phone || !form.email || !form.address || !form.country || !form.state || !form.city || !form.zip) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    // Prepare invoice data
    const templateParams = {
      to_email: form.email.trim(), // Add .trim() to remove whitespace
      to_name: form.name,
      order_total: (total + shippingFee).toFixed(2),
      order_items: cart.map(item => `${item.details?.name} (x${item.quantity})`).join(', '),
      shipping_address: `${form.address}, ${form.city}, ${form.state}, ${form.country?.label}, ${form.zip}`,
      payment_method: paymentMethod,
      user_location: location.lat && location.lng
        ? `${location.city}, ${location.region}, ${location.country} (${location.lat}, ${location.lng})`
        : "Not provided"
    };

    // Add debugging
    console.log("Template params:", templateParams);

    // Send email via EmailJS
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      toast.success("Order placed! Invoice sent to your email.");
      setTimeout(() => navigate("/orders"), 1200); // Redirect after toast
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Order placed, but failed to send invoice email.");
      setTimeout(() => navigate("/orders"), 1200); // Redirect after toast
    }
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success("Location fetched!");
        },
        (error) => {
          toast.error("Unable to fetch your location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ background: light.bg, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ color: light.accent, fontWeight: 700, fontSize: 28, marginBottom: 16 }}>Your cart is empty</h2>
        <Link to="/collection" style={{ color: light.accent, fontWeight: 600, fontSize: 16, textDecoration: "underline" }}>Go back to shop</Link>
        <footer style={{ width: '100%', textAlign: 'center', padding: '18px 0 10px 0', fontSize: 14, color: '#888', background: 'transparent', letterSpacing: 0.5, marginTop: 40 }}>
          © {new Date().getFullYear()} LOYAN. All rights reserved.
        </footer>
      </div>
    );
  }

  const item = cart[0];

  return (
    <div style={{ background: light.bg, minHeight: "100vh", fontFamily: "'Quicksand', 'Poppins', 'Arial', sans-serif", padding: "2.5rem 0" }}>
      <ToastContainer position="top-center" />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/cart")}
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
          Back to Cart
        </button>
        {/* Progress Bar */}
        <StepProgressBar currentStep={1} />
        <div style={{ display: 'flex', gap: 40 }}>
          {/* Left: Shipping Address Form */}
          <form style={{ flex: 1, background: light.card, borderRadius: 18, boxShadow: light.shadow, padding: 36, border: `1.5px solid ${light.border}`, minWidth: 340 }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, color: light.accent, marginBottom: 24 }}>Shipping Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Full Name <span style={{ color: '#e53935' }}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" style={{ ...inputStyle, width: '100%', marginTop: 6 }} required />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Phone Number <span style={{ color: '#e53935' }}>*</span></label>
                <div style={{ marginTop: 6 }}>
                  <PhoneInput
                    country={'pk'}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                      ...inputStyle,
                      width: '100%',
                      paddingLeft: 48,
                      marginTop: 0,
                      marginBottom: 0,
                      padding: '12px 14px',
                      borderRadius: 8,
                      fontSize: 16,
                      height: 48
                    }}
                    buttonStyle={{
                      border: 'none',
                      borderRadius: 8,
                      background: '#fff'
                    }}
                    dropdownStyle={{
                      borderRadius: 8
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false
                    }}
                    enableSearch
                    disableDropdown={false}
                    countryCodeEditable={true}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Email address <span style={{ color: '#e53935' }}>*</span></label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{ ...inputStyle, width: '100%', marginTop: 6 }}
                  required
                  type="email"
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Country <span style={{ color: '#e53935' }}>*</span></label>
                <Select
                  options={countryOptions}
                  value={form.country}
                  onChange={handleCountryChange}
                  placeholder="Select country"
                  isSearchable={false}
                  components={{
                    Option: customCountryOption,
                    SingleValue: customCountrySingleValue
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: 8,
                      border: '1.5px solid #e5e7eb',
                      fontSize: 16,
                      fontWeight: 500,
                      background: '#fff',
                      color: '#222',
                      minHeight: 48,
                      height: 48,
                      boxShadow: 'none',
                      padding: 0
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      height: 48,
                      padding: '0 14px'
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: 8,
                      zIndex: 9999
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: '#888',
                      padding: '0 10px'
                    }),
                    indicatorSeparator: () => ({
                      display: 'none'
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: '#888',
                      fontWeight: 500
                    })
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>State/Province <span style={{ color: '#e53935' }}>*</span></label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State/Province" style={{ ...inputStyle, width: '100%', marginTop: 6 }} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>City <span style={{ color: '#e53935' }}>*</span></label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" style={{ ...inputStyle, width: '100%', marginTop: 6 }} required />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Zip/Postal Code <span style={{ color: '#e53935' }}>*</span></label>
                <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip/Postal Code" style={{ ...inputStyle, width: '100%', marginTop: 6 }} required />
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Address <span style={{ color: '#e53935' }}>*</span></label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Enter your full address" style={{ ...inputStyle, width: '100%', marginTop: 6 }} required />
                <button
                  type="button"
                  onClick={async () => {
                    if ("geolocation" in navigator) {
                      navigator.geolocation.getCurrentPosition(
                        async (position) => {
                          const lat = position.coords.latitude;
                          const lon = position.coords.longitude;
                          try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
                            const data = await response.json();
                            if (data && data.display_name) {
                              setForm((prev) => ({
                                ...prev,
                                address: data.display_name
                              }));
                              toast.success("Address fetched from your location!");
                            } else {
                              toast.error("Could not retrieve address from location.");
                            }
                          } catch (err) {
                            toast.error("Error fetching address from location.");
                          }
                        },
                        (error) => {
                          toast.error("Unable to fetch your location.");
                        }
                      );
                    } else {
                      toast.error("Geolocation is not supported by your browser.");
                    }
                  }}
                  style={{
                    marginTop: 8,
                    padding: '2px 7px',
                    borderRadius: 5,
                    border: 'none',
                    background: '#111',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 11,
                    height: 24,
                    minHeight: 0,
                    minWidth: 0,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px #0001',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#fff"/></svg>
                  Use My Current Location
                </button>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 15, color: light.text }}>Order notes (optional)</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="Share your notes" style={{ ...inputStyle, width: '100%', marginTop: 6 }} />
              </div>
              {/* Removed Fetch My Location button */}
              {location.lat && location.lng && (
                <div style={{ color: "#388e3c", marginTop: 6, fontSize: 14 }}>
                  Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </div>
              )}
            </div>
          </form>
          {/* Right: Order Summary Card */}
          <div style={{ flex: 1, background: light.card, borderRadius: 18, boxShadow: light.shadow, padding: 36, border: `1.5px solid ${light.border}`, minWidth: 340 }}>
            <h2 style={{ fontWeight: 700, fontSize: 24, color: light.accent, marginBottom: 18 }}>Your order</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
              <img src={item.details?.image} alt={item.details?.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, border: `1px solid ${light.border}` }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 17 }}>{item.details?.name}</div>
                <div style={{ color: '#888', fontSize: 15, margin: '4px 0' }}>Size: {item.size}</div>
                {/* Color selection placeholder */}
                <div style={{ color: '#888', fontSize: 15 }}>Color: <span style={{ display: 'inline-block', width: 18, height: 18, borderRadius: '50%', background: '#bdbdbd', border: '1px solid #e0e0e0', verticalAlign: 'middle', marginLeft: 4 }}></span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontWeight: 600 }}>Quantity</span>
              <button
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "#f3f4f6",
                  color: "#111",
                  fontSize: 22,
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #0001",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s"
                }}
                onClick={() => decreaseQuantity(item.id, item.size)}
                aria-label="Decrease quantity"
                onMouseOver={e => e.currentTarget.style.background = "#e5e7eb"}
                onMouseOut={e => e.currentTarget.style.background = "#f3f4f6"}
              >-</button>
              <span style={{
                minWidth: 32,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
                color: "#222"
              }}>{item.quantity}</span>
              <button
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "#f3f4f6",
                  color: "#111",
                  fontSize: 22,
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #0001",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s"
                }}
                onClick={() => increaseQuantity(item.id, item.size)}
                aria-label="Increase quantity"
                onMouseOver={e => e.currentTarget.style.background = "#e5e7eb"}
                onMouseOut={e => e.currentTarget.style.background = "#f3f4f6"}
              >+</button>
              <span style={{ color: '#888', fontSize: 15, marginLeft: 10 }}>Edit</span>
            </div>
            {/* Payment Methods */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: light.text, marginBottom: 8 }}>How you'll pay</div>
              <div style={{
                display: 'flex',
                gap: 16,
                marginBottom: 10,
                flexWrap: 'wrap'
              }}>
                {paymentMethods.map(method => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 18px",
                      borderRadius: 12,
                      border: paymentMethod === method.value ? "2.5px solid #111" : "1.5px solid #e5e7eb",
                      background: paymentMethod === method.value ? "#f6f8fa" : "#fff",
                      boxShadow: paymentMethod === method.value ? "0 2px 12px #0001" : "none",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#222",
                      cursor: "pointer",
                      outline: "none",
                      minWidth: 160,
                      transition: "all 0.18s"
                    }}
                  >
                    {method.icon}
                    {method.label}
                  </button>
                ))}
              </div>
              {paymentMethod && (
                <div style={{ marginTop: 10, color: "#388e3c", fontWeight: 600 }}>
                  Selected: {paymentMethods.find(m => m.value === paymentMethod)?.label}
                </div>
              )}
            </div>
            {/* Price Breakdown */}
            <div style={{ borderTop: `1px solid ${light.border}`, margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, marginBottom: 6 }}>
              <span>Item(s) total</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, marginBottom: 6 }}>
              <span>Shop discount</span>
              <span style={{ color: '#43a047' }}>-0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, marginBottom: 6 }}>
              <span>Subtotal</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, marginBottom: 6 }}>
              <span>Shipping</span>
              <span>{currency}{shippingFee.toFixed(2)}</span>
            </div>
            <div style={{ borderTop: `1px solid ${light.border}`, margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20, color: light.text, marginBottom: 0 }}>
              <span>Total ({cart.length} Item{cart.length > 1 ? 's' : ''})</span>
              <span>{currency}{(total + shippingFee).toFixed(2)}</span>
            </div>
            {/* Place Order button here */}
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                width: '100%',
                marginTop: 28,
                padding: '14px 0',
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: light.shadow,
                letterSpacing: 1,
                transition: 'background 0.2s, color 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
              }}
            >
              Place Order <span style={{ fontSize: 20, display: 'inline-block', transform: 'translateY(2px)' }}>→</span>
            </button>
          </div>
        </div>
        <footer style={{ width: '100%', textAlign: 'center', padding: '18px 0 10px 0', fontSize: 14, color: '#888', background: 'transparent', letterSpacing: 0.5, marginTop: 40 }}>
          © {new Date().getFullYear()} LOYAN. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PlaceOrder; 