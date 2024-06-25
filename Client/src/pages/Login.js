import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { login, socialLogin } from '../services/api';
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
      setError('Por favor rellene todos los campos');
      setLoading(false);
      return;
    }

    try {
      const data = await login(correo_electronico, contraseña);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      try {
        const data = await socialLogin('google', response.credential);
        localStorage.setItem('token', data.token);
      } catch (err) {
        setError('Error al iniciar sesión con Google');
      }
    }
  };

  return (
    <Form onSubmit={handleLogin} className="login-form">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && (
        <div className="custom-alert" onClick={() => setError('')}>
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
        {loading ? 'Cargando...' : 'Iniciar Sesion'}
      </Button>
      <div className="text-center mb-3">
        <Link to="/forgot-password" className="text-decoration-none">¿Ha olvidado su contraseña?</Link>
      </div>
      <div className="social-login-buttons">
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError('Error al iniciar sesión con Google')}
            useOneTap
            text="Iniciar sesión con Google"
            className="social-button google-button"
          />
        </GoogleOAuthProvider>
      </div>
    </Form>
  );
};

export default Login;