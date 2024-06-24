const pool = require('../db');

const Productos = {
  async findAll() {
    const [result] = await pool.query('SELECT * FROM productos');
    // Convertir BLOB a base64
    result.forEach(product => {
      if (product.foto_producto) {
        product.foto_producto = product.foto_producto.toString('base64');
      }
    });
    return result;
  },

  async findById(id) {
    const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
    if (result[0] && result[0].foto_producto) {
      result[0].foto_producto = result[0].foto_producto.toString('base64');
    }
    return result[0];
  },

  async create({ nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto }) {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto]
    );
    return result.insertId;
  },

  async update(id, { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto }) {
    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, id_modelo = ?, id_proveedor = ?, descuento = ?, foto_producto = ? WHERE id_producto = ?',
      [nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Productos;