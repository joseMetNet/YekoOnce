import dotEnv from 'dotenv';
// Utilizar variables de entorno
dotEnv.config();

export default {
    port: process.env.PORT || "8080", 
    host_mysql: process.env.HOST_MYSQL || "",
    user_mysql: process.env.USER_MYSQL || "",
    password_mysql: process.env.PASSWORD_MYSQL || "",
    database_mysql: process.env.DATABASE_MYSQL || ""
};