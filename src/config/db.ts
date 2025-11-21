import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  // propiedad para quitar los logs de la db de la consola 
  logging: false,
  // Configuración para quitar de las tablas el createdAt y updatedAt
  // define: {
  //   timestamps: false
  // },
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
});
