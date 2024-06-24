import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../styles/components/AuthContainer.css';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const loginImage = "https://img.freepik.com/foto-gratis/hombre-motocicleta-estilo-cafe-racer_23-2148189648.jpg?t=st=1718123165~exp=1718126765~hmac=b75f576ceb9315869a3512e1dc93e211386dd14ecf927523bd2a395892a41c7b&w=740";
  const registerImage = "https://img.freepik.com/foto-gratis/hombres-motocicleta-dia-invierno_23-2148875783.jpg?t=st=1718139215~exp=1718142815~hmac=045c8cd811f5d28cb8876ed42b67dfe0dac0cc78de38fb709b0d85c611373ecb&w=1380"; // Replace with your register image URL

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
