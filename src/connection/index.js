import axios from 'axios';

export const baseUrl = 'https://dry-woodland-14649.herokuapp.com';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
