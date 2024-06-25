const pool = require('../db');
const bcrypt = require('bcryptjs');

const Usuario = {
  async create(data) {
    const {
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_rol,
      telefono,
      direccion_envio,
      foto_perfil,
      google_id,
      facebook_id,
    } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = contraseña ? await bcrypt.hash(contraseña, salt) : null;

    const [result] = await pool.query(
      `INSERT INTO usuarios (username, nombre_usuario, apellido_usuario, contraseña, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil, google_id, facebook_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, nombre_usuario, apellido_usuario, hashedPassword, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil, google_id, facebook_id]
    );

    return result.insertId;
  },

  async getAll() {
    const [results] = await pool.query('SELECT * FROM usuarios');
    return results;
  },

  async getById(id) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return results[0];
  },

  async updateById(id, data) {
    const {
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_rol,
      telefono,
      direccion_envio,
      foto_perfil,
      google_id,
      facebook_id,
    } = data;

    let updateQuery = `UPDATE usuarios SET username = ?, nombre_usuario = ?, apellido_usuario = ?, correo_electronico = ?, id_rol = ?, telefono = ?, direccion_envio = ?, foto_perfil = ?, google_id = ?, facebook_id = ?`;
    const updateValues = [username, nombre_usuario, apellido_usuario, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil, google_id, facebook_id];

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);
      updateQuery += `, contraseña = ?`;
      updateValues.push(hashedPassword);
    }

    updateQuery += ` WHERE id_usuario = ?`;
    updateValues.push(id);

    const [result] = await pool.query(updateQuery, updateValues);
    return result.affectedRows;
  },

  async deleteById(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows;
  },

  async getUserByEmail(email) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [email]);
    return results[0];
  },

  async getUserByGoogleId(google_id) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE google_id = ?', [google_id]);
    return results[0];
  },

  async getUserByFacebookId(facebook_id) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE facebook_id = ?', [facebook_id]);
    return results[0];
  },

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = Usuario;
