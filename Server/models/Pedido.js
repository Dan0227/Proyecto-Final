const pool = require('../db');

const Pedido = {
  async create({ id_usuario, estado }) {
    const [result] = await pool.query(
      'INSERT INTO pedidos (id_usuario, estado) VALUES (?, ?)',
      [id_usuario, estado]
    );
    console.log('Pedido creado:', result.insertId);
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    console.log('Todos los pedidos:', rows);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
    console.log(`Pedido con id ${id}:`, rows[0]);
    return rows[0];
  },

  async update(id, { id_usuario, estado }) {
    const [result] = await pool.query(
      'UPDATE pedidos SET id_usuario = ?, estado = ? WHERE id_pedido = ?',
      [id_usuario, estado, id]
    );
    console.log(`Pedido con id ${id} actualizado:`, result);
    return result;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    console.log(`Pedido con id ${id} eliminado:`, result);
    return result;
  }
};

module.exports = Pedido;