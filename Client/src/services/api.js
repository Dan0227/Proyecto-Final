import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL base de tu API

export const login = async (correo_electronico, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, {
      correo_electronico,
      contraseña,
    });
    return response.data;
  } catch (error) {
    // Añadir un chequeo adicional para error.response
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    } else {
      throw new Error('Error al conectar con el servidor');
    }
  }
};



export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, productData);
    return response.data; // Asegúrate de retornar response.data
  } catch (error) {
    throw error;
  }
};