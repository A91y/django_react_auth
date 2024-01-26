import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details', error.response.data);
        if (error.response.status === 401) {
          // Redirect to login if the access token is not valid or expired
          window.location.href = '/login';
        } else {
          // Handle other errors as needed
        }
      }
    };

    fetchUserDetails();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome to the Dashboard, {user.first_name}!</h2>
          {/* Add your dashboard content here */}
          <p>This is your personalized dashboard. Customize it with your content!</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
