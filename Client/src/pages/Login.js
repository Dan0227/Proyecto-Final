// src/pages/Login.js

import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { login as loginService } from '../services/api';
import '../styles/pages/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await loginService(email, password);
      login(response.token, response.id_rol);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
      setLoading(false);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-input"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-input"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="login-button"
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>
      <div className="text-center mb-3">
        <Link to="/forgot-password" className="text-decoration-none">¿Olvidó su contraseña?</Link>
      </div>
    </Form>
  );
};

export default Login;