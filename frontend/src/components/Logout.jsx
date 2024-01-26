import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Get the refresh token from local storage
      const refreshToken = localStorage.getItem("refreshToken");

      // Make a POST request to the Django logout endpoint
      const response = await axios.post("http://localhost:8000/api/logout/", {
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
      {/* <h2>Logout</h2> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
