import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../styles/components/AuthContainer.css';
import loginImage from '../img/panel-inicio-sesion.jpg'; // Importa la imagen de inicio de sesión
import registerImage from '../img/panel-registrarse.jpg'; // Importa la imagen de registro

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page-container">
      <div className={`auth-content ${isLogin ? 'show-login' : 'show-register'}`}>
        <div className="auth-form login-form">
          <Login />
        </div>
        <div className="auth-form register-form">
          <Register />
        </div>
        <div 
          className="auth-cover" 
          style={{ 
            backgroundImage: `url(${isLogin ? loginImage : registerImage})`
          }}
        >
          <div className="toggle-button-container">
            <button onClick={toggleAuthMode} className="toggle-button">
              {isLogin ? '¿Ya tiene una cuenta? Conéctese' : 'Crear una cuenta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
