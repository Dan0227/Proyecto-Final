const pool = require('../db');

const Category = {
  async create({ nombre }) {
    console.log('Creating category with name:', nombre);
    const result = await pool.query(
      'INSERT INTO categorias (nombre) VALUES (?)',
      [nombre]
    );
    console.log('Result of insert query:', result);
    return result[0].insertId;
  },

  async findAll() {
    console.log('Fetching all categories');
    const [categories] = await pool.query('SELECT * FROM categorias');
    console.log('Result of fetch all query:', categories);
    return categories;
  },

  async findById(id) {
    console.log('Fetching category with id:', id);
    const [category] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    console.log('Result of fetch by id query:', category);
    return category[0];
  },

  async update(id, { nombre }) {
    console.log('Updating category with id:', id, 'to name:', nombre);
    const result = await pool.query(
      'UPDATE categorias SET nombre = ? WHERE id_categoria = ?',
      [nombre, id]
    );
    console.log('Result of update query:', result);
    return result[0].affectedRows > 0;
  },

  async delete(id) {
    console.log('Deleting category with id:', id);
    const result = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
    console.log('Result of delete query:', result);
    return result[0].affectedRows > 0;
  }
};

module.exports = Category;