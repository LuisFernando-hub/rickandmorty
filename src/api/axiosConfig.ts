import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000, // Tempo de espera para a requisição
});

export default axiosInstance;
