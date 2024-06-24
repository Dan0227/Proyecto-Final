const pool = require('../db');

const TipoDoc = {
  async getAll() {
    const [result] = await pool.query('SELECT * FROM tipo_doc');
    return result;
  },

  async getById(id) {
    const [result] = await pool.query('SELECT * FROM tipo_doc WHERE id_tipo_doc = ?', [id]);
    return result[0];
  },

  async create(nombre) {
    const [result] = await pool.query('INSERT INTO tipo_doc (nombre) VALUES (?)', [nombre]);
    return result.insertId;
  },

  async update(id, nombre) {
    await pool.query('UPDATE tipo_doc SET nombre = ? WHERE id_tipo_doc = ?', [nombre, id]);
  },

  async delete(id) {
    await pool.query('DELETE FROM tipo_doc WHERE id_tipo_doc = ?', [id]);
  }
};

module.exports = TipoDoc;