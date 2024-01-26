import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await api.get("/user/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        // console.error('Error fetching user details', error.response.data);
        setError("Error fetching user details. Please try again."); // Set error message
        // Handle error, e.g., redirect to login
      }
    };

    fetchUserDetails();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      {isAuthenticated && user ? (
        <>
          <p>
            {user.first_name} {user.last_name}
          </p>
          {/* Add additional content for authenticated users */}
        </>
      ) : (
        <p>{"Not Logged in" || "Loading..."}</p>
      )}
    </div>
  );
};

export default Home;
