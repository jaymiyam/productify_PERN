import axios from 'axios';

// create one single instance of our API for repeated frontend usage
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // allow sending cookies with request body
});

export default api;
