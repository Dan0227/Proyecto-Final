const express = require('express');
const Modelos = require('../models/Modelos');

const router = express.Router();

// Get all models
router.get('/', async (req, res) => {
  console.log('GET /api/modelos - Fetching all models');
  try {
    const modelos = await Modelos.findAll();
    res.json(modelos);
  } catch (err) {
    console.error('Error fetching all models:', err.message);
    res.status(500).send('Server error');
  }
});

// Get model by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/modelos/${id} - Fetching model by ID`);
  try {
    const modelo = await Modelos.findById(id);
    if (!modelo) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.json(modelo);
  } catch (err) {
    console.error(`Error fetching model by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Create new model
router.post('/', async (req, res) => {
  const { id_marca, nombre, año } = req.body;
  console.log('POST /api/modelos - Creating new model');
  try {
    const newModelId = await Modelos.create({ id_marca, nombre, año });
    res.status(201).json({ msg: 'Model created', id: newModelId });
  } catch (err) {
    console.error('Error creating new model:', err.message);
    res.status(500).send('Server error');
  }
});

// Update model by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_marca, nombre, año } = req.body;
  console.log(`PUT /api/modelos/${id} - Updating model by ID`);
  try {
    const affectedRows = await Modelos.update(id, { id_marca, nombre, año });
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.json({ msg: 'Model updated' });
  } catch (err) {
    console.error(`Error updating model by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

// Delete model by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/modelos/${id} - Deleting model by ID`);
  try {
    const affectedRows = await Modelos.delete(id);
    if (affectedRows === 0) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.json({ msg: 'Model deleted' });
  } catch (err) {
    console.error(`Error deleting model by ID ${id}:`, err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;