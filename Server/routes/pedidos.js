const express = require('express');
const Pedido = require('../models/Pedido');

const router = express.Router();

// Crear Pedido
router.post('/', async (req, res) => {
  const { id_usuario, estado } = req.body;
  try {
    const id = await Pedido.create({ id_usuario, estado });
    res.json({ id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los Pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener Pedido por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id);
    res.json(pedido);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar Pedido
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_usuario, estado } = req.body;
  try {
    await Pedido.update(id, { id_usuario, estado });
    res.json({ msg: 'Pedido actualizado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar Pedido
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Pedido.delete(id);
    res.json({ msg: 'Pedido eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;