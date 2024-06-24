// routes/usuarios.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const pool = require('../db'); 

const router = express.Router();
const secretKey = 'your_secret_key';

// crear usuario
router.post('/', async (req, res) => {
  const {
    username,
    nombre_usuario,
    apellido_usuario,
    contraseña,
    correo_electronico,
    id_tipo_doc,
    id_rol,
    identificacion,
    direccion,
    telefono,
    direccion_envio,
    direccion_entrega_por_defecto,
    foto_perfil
  } = req.body;

  try {
    console.log('Creating usuario:', username);
    const id = await Usuario.create({
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_tipo_doc,
      id_rol,
      identificacion,
      direccion,
      telefono,
      direccion_envio,
      direccion_entrega_por_defecto,
      foto_perfil
    });
    console.log('Usuario created with ID:', id);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating usuario:', error);
    res.status(500).json({ error: 'Error creating usuario' });
  }
});

// Todos los usuarios
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all usuarios');
    const usuarios = await Usuario.getAll();
    console.log('Result of fetch all query:', usuarios);
    res.json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    res.status(500).json({ error: 'Error fetching usuarios' });
  }
});

// Buscar ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Fetching usuario with ID: ${id}`);
    const usuario = await Usuario.getById(id);
    if (!usuario) {
      console.log('Usuario not found');
      res.status(404).json({ error: 'Usuario not found' });
    } else {
      console.log('Result of fetch by ID query:', usuario);
      res.json(usuario);
    }
  } catch (error) {
    console.error('Error fetching usuario by ID:', error);
    res.status(500).json({ error: 'Error fetching usuario by ID' });
  }
});

// Actualizar por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    username,
    nombre_usuario,
    apellido_usuario,
    contraseña,
    correo_electronico,
    id_tipo_doc,
    id_rol,
    identificacion,
    direccion,
    telefono,
    direccion_envio,
    direccion_entrega_por_defecto,
    foto_perfil
  } = req.body;

  try {
    console.log(`Updating usuario with ID: ${id}`);
    const affectedRows = await Usuario.updateById(id, {
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_tipo_doc,
      id_rol,
      identificacion,
      direccion,
      telefono,
      direccion_envio,
      direccion_entrega_por_defecto,
      foto_perfil
    });
    if (affectedRows === 0) {
      console.log('Usuario not found');
      res.status(404).json({ error: 'Usuario not found' });
    } else {
      console.log('Usuario updated successfully');
      res.json({ message: 'Usuario updated successfully' });
    }
  } catch (error) {
    console.error('Error updating usuario:', error);
    res.status(500).json({ error: 'Error updating usuario' });
  }
});

// Eliminar por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Deleting usuario with ID: ${id}`);
    const affectedRows = await Usuario.deleteById(id);
    if (affectedRows === 0) {
      console.log('Usuario not found');
      res.status(404).json({ error: 'Usuario not found' });
    } else {
      console.log('Usuario deleted successfully');
      res.json({ message: 'Usuario deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting usuario:', error);
    res.status(500).json({ error: 'Error deleting usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo_electronico, contraseña } = req.body;

  try {
    console.log('Attempting login for:', correo_electronico);
    const user = await Usuario.getUserByEmail(correo_electronico);

    if (!user) {
      console.log('Usuario not found');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await Usuario.comparePassword(contraseña, user.contraseña);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id_usuario, email: user.correo_electronico }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;