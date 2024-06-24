import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    id: 1, // Simulando que el usuario tiene el ID 1
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    motoPreferida: '',
    metodoPago: '',
    historialCompras: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user.id}`); // Ajusta la URL según tu configuración
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [user.id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, user); // Ajusta la URL según tu configuración
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-picture"
        />
        <h1>{user.nombre}</h1>
        <p className="moto-preferida">Moto preferida: {user.motoPreferida}</p>
        <p className="metodo-pago">Método de pago: {user.metodoPago}</p>
      </div>

      <div className="profile-content">
        <div className="profile-nav">
          <button>About</button>
          <button>Purchase History</button>
          <button>Settings</button>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <h2>Edit Profile</h2>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={user.direccion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="motoPreferida">Moto Preferida</label>
                <input
                  type="text"
                  id="motoPreferida"
                  name="motoPreferida"
                  value={user.motoPreferida}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="metodoPago">Método de Pago</label>
                <input
                  type="text"
                  id="metodoPago"
                  name="metodoPago"
                  value={user.metodoPago}
                  onChange={handleChange}
                />
              </div>
              <button className="btn" onClick={handleUpdate}>Actualizar Perfil</button>
              <button className="btn" onClick={() => setIsEditing(false)}>Cancelar</button>
              {message && <div className="message">{message}</div>}
            </>
          ) : (
            <>
              <h2>About</h2>
              <div className="info-group">
                <h3>Nombre</h3>
                <p>{user.nombre}</p>
              </div>
              <div className="info-group">
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <h3>Dirección</h3>
                <p>{user.direccion}</p>
              </div>
              <div className="info-group">
                <h3>Teléfono</h3>
                <p>{user.telefono}</p>
              </div>
              <div className="info-group">
                <h3>Moto Preferida</h3>
                <p>{user.motoPreferida}</p>
              </div>
              <div className="info-group">
                <h3>Método de Pago</h3>
                <p>{user.metodoPago}</p>
              </div>
              <button className="btn" onClick={() => setIsEditing(true)}>Editar Perfil</button>
              <h2>Historial de Compras</h2>
              <ul className="purchase-history">
                {user.historialCompras.map((compra, index) => (
                  <li key={index}>
                    <p>Producto: {compra.producto}</p>
                    <p>Fecha: {compra.fecha}</p>
                    <p>Monto: ${compra.monto}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
