import React from "react";
import api from "../../services/api";

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Get the refresh token from local storage
      const refreshToken = localStorage.getItem("refreshToken");

      // Make a POST request to the Django logout endpoint
      await api.post("/logout/", {
        refresh_token: refreshToken,
      });

      // Clear tokens and user data from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      console.log("Logout successful");
      // Redirect or perform other actions as needed after successful logout
    } catch (error) {
      console.error("Logout failed", error.response.data);
      // Handle logout failure, e.g., redirect to login page
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
