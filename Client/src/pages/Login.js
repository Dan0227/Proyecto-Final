import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import '../styles/pages/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      if (email === 'user@example.com' && password === 'password') {
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    }, 2000);
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
        {loading ? 'Loading...' : 'Login'}
      </Button>
      <div className="text-center mb-3">
        <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
      </div>
      <div className="social-login-buttons text-center">
        <Button variant="link" className="social-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" />
        </Button>
        <Button variant="link" className="social-button">
          <img src="https://services.google.com/fh/files/misc/google_g_icon_download.png" alt="Google" />
        </Button>
      </div>
    </Form>
  );
};

export default Login;
