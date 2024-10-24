import axios from 'axios';
import Cookies from 'js-cookie';

// Add a request interceptor to attach the token
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    console.log("Token in interceptor:", token); // Log the token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found, request might be unauthorized.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);