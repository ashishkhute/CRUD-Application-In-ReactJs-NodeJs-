import express, { Application } from "express";
const PORT = process.env.PORT || 8080;
const app : Application = express();
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from "body-parser";
import { studentRouter } from "./src/routes/routes";
import authRouter from "./src/routes/authRoute";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from 'cookie-parser'
import { AppDataSource } from "./data-source";

const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
        info: {
          title: "Swagger Documentation for Student CRUD API and Users API Endpoints",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${PORT}/`}],
      },
      apis: [
        `./src/routes/*.ts`
      ],
  };
  const specs = swaggerJsdoc(swaggerOptions);
  
app.options("*", cors({ origin: 'http://localhost:4000', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:4000", optionsSuccessStatus: 200 }));
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use("/students", studentRouter);
app.use("/users", authRouter);
app.use(cookieParser())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{explorer:true})
  );
if(process.env.NODE_ENV !== "test"){
  app.listen(PORT, () => console.log("Server is running on port : " + process.env.PORT));
  AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established successfully!");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
}  


export default app