import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://careclub-x4qw.onrender.com', //backend URL
});

export default instance;
