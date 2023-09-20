import { DataSource, Entity } from "typeorm";
import dotenv from "dotenv";
import { Student } from "./src/Entity/Student";
import { User } from "./src/Entity/User";
import "reflect-metadata";
dotenv.config();

const AppDataSource =  process.env.NODE_ENV === "test" ?
new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME2,
  entities: {Student, User},
  synchronize: true,
  logging: false,})
:new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: {Student, User},
  synchronize: true,
  logging: false,
});



export { AppDataSource };