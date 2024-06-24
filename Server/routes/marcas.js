const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca');

// Get all brands
router.get('/', async (req, res) => {
  console.log('GET /api/marcas - Fetching all brands');
  try {
    const brands = await Marca.findAll();
    res.json(brands);
  } catch (err) {
    console.error('GET /api/marcas - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Get a brand by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('GET /api/marcas/:id - Fetching brand with ID:', id);
  try {
    const brand = await Marca.findById(id);
    if (!brand) {
      return res.status(404).json({ msg: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (err) {
    console.error('GET /api/marcas/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Create a new brand
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  console.log('POST /api/marcas - Creating brand with name:', nombre);
  try {
    const brandId = await Marca.create({ nombre });
    res.json({ msg: 'Marca creada exitosamente', brandId });
  } catch (err) {
    console.error('POST /api/marcas - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Update a brand by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  console.log('PUT /api/marcas/:id - Updating brand with ID:', id, 'to name:', nombre);
  try {
    const updated = await Marca.update(id, { nombre });
    if (!updated) {
      return res.status(404).json({ msg: 'Marca no encontrada' });
    }
    res.json({ msg: 'Marca actualizada exitosamente' });
  } catch (err) {
    console.error('PUT /api/marcas/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Delete a brand by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('DELETE /api/marcas/:id - Deleting brand with ID:', id);
  try {
    const deleted = await Marca.delete(id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Marca no encontrada' });
    }
    res.json({ msg: 'Marca eliminada exitosamente' });
  } catch (err) {
    console.error('DELETE /api/marcas/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;