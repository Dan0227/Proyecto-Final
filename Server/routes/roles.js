const express = require('express');
const Roles = require('../models/Roles');

const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  console.log('GET /api/roles - Fetching all roles');
  try {
    const roles = await Roles.findAll();
    res.json(roles);
  } catch (err) {
    console.error('Error fetching all roles:', err.message);
    res.status(500).send('Server error');
  }
});

// Get role by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/roles/${id} - Fetching role by ID`);
  try {
    const role = await Roles.findById(id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.json(role);
  } catch (err) {
    console.error(`Error fetching role by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Create new role
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  console.log('POST /api/roles - Creating new role');
  try {
    const newRoleId = await Roles.create(nombre);
    res.status(201).json({ msg: 'Role created', id: newRoleId });
  } catch (err) {
    console.error('Error creating new role:', err.message);
    res.status(500).send('Server error');
  }
});

// Update role by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  console.log(`PUT /api/roles/${id} - Updating role by ID`);
  try {
    const affectedRows = await Roles.update(id, nombre);
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.json({ msg: 'Role updated' });
  } catch (err) {
    console.error(`Error updating role by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Delete role by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/roles/${id} - Deleting role by ID`);
  try {
    const affectedRows = await Roles.delete(id);
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.json({ msg: 'Role deleted' });
  } catch (err) {
    console.error(`Error deleting role by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;