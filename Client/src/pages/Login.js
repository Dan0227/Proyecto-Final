import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { login } from '../services/api'; // Importar el método login
import '../styles/pages/Login.css';

const Login = () => {
  const [correo_electronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!correo_electronico || !contraseña) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { correo_electronico, contraseña });
      const data = await login(correo_electronico, contraseña);
      console.log('Login successful', data);
      localStorage.setItem('token', data.token);
      // Redirigir a otra página si el login es exitoso
      // Puedes redirigir a otra ruta usando react-router-dom
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setError('');
  };

  return (
    <Form onSubmit={handleLogin} className="login-form">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && (
        <div className="custom-alert" onClick={handleCloseAlert}>
          <div className="alert-content">
            {error}
          </div>
        </div>
      )}
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Correo Electrónico"
          value={correo_electronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          className="rounded-input"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="rounded-input"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="login-button"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
      <div className="text-center mb-3">
        <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
      </div>
    </Form>
  );
};

export default Login;