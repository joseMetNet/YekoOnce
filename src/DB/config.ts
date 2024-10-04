import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import config from "../config/config";

const dbConnection  = new Sequelize({
  dialect: MySqlDialect,
  database: config.database_mysql,
  user: config.user_mysql,
  password: config.password_mysql,
  host: config.host_mysql,
  port: 25060,
  connectTimeout: 10000,
  charset: 'utf8mb4',
});

// Función para probar la conexión
async function testConnection() {
  try {
    await dbConnection.authenticate(); // Prueba de autenticación
    console.log('Conexión a MySQL establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  } finally {
    await dbConnection.close(); // Cierra la conexión
  }
}

// Exporta la instancia de la conexión y la función de prueba
export { dbConnection, testConnection };
