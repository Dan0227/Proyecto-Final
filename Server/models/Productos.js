const pool = require('../db');

const Productos = {
  async findAll() {
    console.log('Fetching all products');
    const [result] = await pool.query('SELECT * FROM productos');
    console.log('Result of fetch all query:', result);
    return result;
  },

  async findById(id) {
    console.log(`Fetching product with ID: ${id}`);
    const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
    console.log(`Result of fetch by ID query:`, result);
    return result[0];
  },

  async create({ nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto }) {
    console.log('Creating new product:', { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto });
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto]
    );
    console.log('Result of create query:', result);
    return result.insertId;
  },

  async update(id, { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto }) {
    console.log(`Updating product with ID: ${id}`, { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto });
    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, id_modelo = ?, id_proveedor = ?, descuento = ?, foto_producto = ? WHERE id_producto = ?',
      [nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto, id]
    );
    console.log('Result of update query:', result);
    return result.affectedRows;
  },

  async delete(id) {
    console.log(`Deleting product with ID: ${id}`);
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    console.log('Result of delete query:', result);
    return result.affectedRows;
  }
};

module.exports = Productos;