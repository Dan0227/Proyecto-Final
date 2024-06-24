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
  // try {
  //   const response = await axios.get(`${API_URL}/productos`);
  //   return response.data;
  // } catch (error) {
  //   throw Error(`Error fetching products: ${error}`);
  // }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, productData);
    return response.data; // Asegúrate de retornar response.data
  } catch (error) {
    throw error;
  }
};

// Función para crear un usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, userData);
    return response.data; // Devuelve los datos del servidor si la solicitud tiene éxito
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.log('Respuesta de error del servidor:', error.response.data);
      console.log('Código de estado HTTP:', error.response.status);
      console.log('Encabezados de respuesta:', error.response.headers);
      throw new Error('Error de servidor');
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.log('No se recibió respuesta del servidor:', error.request);
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Ocurrió un error al configurar la solicitud
      console.log('Error al configurar la solicitud:', error.message);
      throw new Error('Error al configurar la solicitud');
    }
  }
};