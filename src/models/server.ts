import config from "../config/config";
import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import "colors";
import i18n from "../config/i18n";
import fileUpload from 'express-fileupload';
import setupSwagger from '../helpers/swagger';
import cardRouter from "../routes/card.router";
import meberKuponRouter from "../routes/member_kupon";
import memberCardActivationProcessRouter from "../routes/member_card_activation_process.router";
import abonadoRouter from "../routes/abonado.router";
import deliveryOrderRouter from "../routes/delivery_order.router";

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: config.database_mysql,
  user: config.user_mysql,
  password: config.password_mysql,
  host: config.host_mysql,
  port: 25060,
  connectTimeout: 10000,
  charset: 'utf8mb4',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  }
}

class Server {
  private app: Application;
  private port: string;
  private path: any;

  constructor() {
    this.app = express();
    this.port = config.port || '8080';
    this.path = {
      example: "/yekoclubonce",
    };

    this.conectarDB();
    this.middlewares();
    this.routes();

    setupSwagger(this.app);
  }

  async conectarDB() {
    await testConnection();
  }

  configurarCORS() {
    const corsOptions = {
      origin: process.env.URL_FRONT,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200
    };

    this.app.use(cors(corsOptions));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp/",
        createParentPath: true,
      })
    );
    this.app.use(i18n.init);
  }

  routes() {
    this.app.use(this.path.example, cardRouter);
    this.app.use(this.path.example, meberKuponRouter);
    this.app.use(this.path.example, memberCardActivationProcessRouter);
    this.app.use(this.path.example, abonadoRouter);
    this.app.use(this.path.example, deliveryOrderRouter)
  }

  listen() {
    console.clear();
    this.app.listen(this.port, () => {
      console.log(`🔥 Server in port ${this.port}`.bold);
    });
  }
}

export default Server;
