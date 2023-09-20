import express from 'express'
import { AddUser, GetUsers, Login, GetUser} from '../Controller/UserController';
import {  Authorize } from '../Middleware/auth';
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     getUsersModel:
 *       type: object
 *       required:
 *         - id
 *         - userName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: This API endpoint allows to show all users
 *     tags: [User]
 *                 
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Show all Users"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
authRouter.get("/",GetUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create user
 *     description: This API endpoint allows to Create New user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Added Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
authRouter.post("/register", AddUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login of user
 *     description: This API endpoint allows to Login user with authentication
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
authRouter.post("/login",Login);
authRouter.put("/verify", Authorize,GetUser);

export default authRouter