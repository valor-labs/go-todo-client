import axios from 'axios';

require('dotenv').config();

export const baseUrl = process.env.REACT_APP_API_URL;

console.log(111, baseUrl, process.env);

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
