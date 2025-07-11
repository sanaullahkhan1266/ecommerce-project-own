import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    navigate("/login");
    return null;
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Profile</h2>
      <p>Welcome to your profile page!</p>
      {/* Add more profile info here */}
    </div>
  );
};

export default Profile; 