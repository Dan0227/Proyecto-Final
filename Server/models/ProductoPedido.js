const pool = require('../db');

const ProductoPedido = {
  async getAll() {
    const [result] = await pool.query('SELECT * FROM productos_pedidos');
    return result;
  },

  async getById(id) {
    const [result] = await pool.query('SELECT * FROM productos_pedidos WHERE id_producto_pedido = ?', [id]);
    return result[0];
  },

  async create(data) {
    try {
      const { id_pedido, id_producto, cantidad } = data;
      const [result] = await pool.query(
        'INSERT INTO productos_pedidos (id_pedido, id_producto, cantidad) VALUES (?, ?, ?)',
        [id_pedido, id_producto, cantidad]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to create product-order: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const { id_pedido, id_producto, cantidad } = data;
      await pool.query(
        'UPDATE productos_pedidos SET id_pedido = ?, id_producto = ?, cantidad = ? WHERE id_producto_pedido = ?',
        [id_pedido, id_producto, cantidad, id]
      );
    } catch (error) {
      throw new Error('Failed to update product-order: ' + error.message);
    }
  },

  async delete(id) {
    try {
      await pool.query('DELETE FROM productos_pedidos WHERE id_producto_pedido = ?', [id]);
    } catch (error) {
      throw new Error('Failed to delete product-order: ' + error.message);
    }
  }
};

module.exports = ProductoPedido;