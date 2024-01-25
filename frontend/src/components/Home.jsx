import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState(null);
    const isAuthenticated = localStorage.getItem('accessToken') !== null;

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
            // Handle error, e.g., redirect to login
          }
        };
    
        fetchUserDetails();
      }, []); // The empty dependency array ensures that this effect runs once when the component mounts
  return (
    <div>
        <h2>Home</h2>
        <p>Welcome to the home page!</p>
        {/* {isAuthenticated ? (<>{user.first_name} {user.last_name}</>) : (<></>)} */}
    </div>
  )
}

export default Home