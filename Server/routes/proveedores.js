const express = require('express');
const Proveedores = require('../models/Proveedores');

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
  console.log('GET /api/proveedores - Fetching all providers');
  try {
    const providers = await Proveedores.findAll();
    res.json(providers);
  } catch (err) {
    console.error('Error fetching all providers:', err.message);
    res.status(500).send('Server error');
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/proveedores/${id} - Fetching provider by ID`);
  try {
    const provider = await Proveedores.findById(id);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json(provider);
  } catch (err) {
    console.error(`Error fetching provider by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Create new provider
router.post('/', async (req, res) => {
  const { nombre, direccion, telefono, correo } = req.body;
  console.log('POST /api/proveedores - Creating new provider');
  try {
    const newProviderId = await Proveedores.create({ nombre, direccion, telefono, correo });
    res.status(201).json({ msg: 'Provider created', id: newProviderId });
  } catch (err) {
    console.error('Error creating new provider:', err.message);
    res.status(500).send('Server error');
  }
});

// Update provider by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, correo } = req.body;
  console.log(`PUT /api/proveedores/${id} - Updating provider by ID`);
  try {
    const affectedRows = await Proveedores.update(id, { nombre, direccion, telefono, correo });
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json({ msg: 'Provider updated' });
  } catch (err) {
    console.error(`Error updating provider by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Delete provider by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/proveedores/${id} - Deleting provider by ID`);
  try {
    const affectedRows = await Proveedores.delete(id);
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json({ msg: 'Provider deleted' });
  } catch (err) {
    console.error(`Error deleting provider by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;