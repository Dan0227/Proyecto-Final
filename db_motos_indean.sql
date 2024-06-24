CREATE DATABASE tienda_repuestos_motos;
    
USE tienda_repuestos_motos;

-- Tabla de categorías de productos
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    INDEX idx_nombre (nombre)
);

-- Tabla de marcas de motos
CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    INDEX idx_nombre (nombre)
);

-- Tabla de modelos de motos
CREATE TABLE modelos (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    id_marca INT,
    nombre VARCHAR(100) NOT NULL,
    año INT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca),
    INDEX idx_id_marca (id_marca),
    INDEX idx_nombre (nombre)
);

-- Tabla de proveedores
CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100),
    telefono VARCHAR(15),
    correo VARCHAR(50),
    INDEX idx_nombre (nombre)
);

-- Tabla de productos
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    id_modelo INT,
    id_proveedor INT,
    descuento INT CHECK (descuento BETWEEN 0 AND 100),
    foto_producto BLOB,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_modelo) REFERENCES modelos(id_modelo),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    INDEX idx_nombre (nombre),
    INDEX idx_id_categoria (id_categoria),
    INDEX idx_id_proveedor (id_proveedor)
);
-- Tabla de roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla de tipos de documento
CREATE TABLE tipo_doc (
    id_tipo_doc INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL,
    apellido_usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    id_tipo_doc INT,
    FOREIGN KEY (id_tipo_doc) REFERENCES tipo_doc(id_tipo_doc),
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    identificacion VARCHAR(50),
    direccion VARCHAR(100),
    telefono VARCHAR(15),
    direccion_envio VARCHAR(100),
    direccion_entrega_por_defecto VARCHAR(100),
    foto_perfil BLOB,
    INDEX idx_nombre_usuario (nombre_usuario),
    INDEX idx_correo_electronico (correo_electronico)
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de productos_pedidos (relación muchos a muchos entre productos y pedidos)
CREATE TABLE productos_pedidos (
    id_producto_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

PROYECTO-FINAL/
Cliente/
├── node_modules/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── components/
│ │ ├── LoginForm.js
│ │ └── AuthContainer.js
│ │ └── Navbar.js
│ │ └── OrderList.js
│ │ └── ProductList.js
│ ├── img/
│ │ └── moto.jpg
│ ├── pages/
│ │ └── ForgotPassword.js
│ │ └── Home.js
│ │ └── Inventory.js
│ │ └── InventoryPage.js
│ │ └── Login.js
│ │ └── OrderPage.js
│ │ └── Register.js
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ └── ...
│ ├── App.jsx
│ ├── index.js
│ └── index.css
├── package.json
Servidor/
├── models/
│ └── Category.js
│ └── Marca.js
│ └── Modelos.js
│ └── Pedido.js
│ └── ProductoPedido.js
│ └── Productos.js
│ └── Proveedores.js
│ └── Roles.js
│ └── TipoDoc.js
│ └── Usuario.js
├── node_modulels/
├── routes/
│ └── categories.js
│ └── marcas.js
│ └── modelos.js
│ └── pedidos.js
│ └── productoPedido.js
│ └── productos.js
│ └── proveedores.js
│ └── roles.js
│ └── tipoDoc.js
│ └── usuatios.js
├── db.js
├── package.json
├── server.js