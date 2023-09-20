import express from "express";
const studentRouter = express.Router();

import * as StudentController from "../Controller/StudentController"

/**
 * @swagger
 * tags:
 *   name: Student CRUD
 *   description: Endpoints for Student management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     getAllStudentsModel:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - age
 *         - email
 *         - address
 *         - mobile
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         age:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         mobile:
 *           type: string
 *         
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     description: This API endpoint allows to show all students
 *     tags: [Student]
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
 *                   example: "Show all students"
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

studentRouter.get("/", StudentController.GetAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a Student
 *     description: This API endpoint finds a student With the provided ID.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the User to find
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
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
 *                   example: "Found Successfully"
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

studentRouter.get("/:id",StudentController.GetStudent)

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create student
 *     description: This API endpoint allows to Create New student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 mobile:
 *                   type: string
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
studentRouter.post("/",StudentController.AddStudent)

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update an Student
 *     description: This API endpoint allows to Update an Existing Student.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 mobile:
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
 *                   type: string
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Updated Successfully"
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
studentRouter.put("/:id",StudentController.UpdateStudent)


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete Student
 *     description: This API endpoint deletes a student With the provided ID.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the User to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
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
 *                   example: "Deleted Successfully"
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
studentRouter.delete("/:id",StudentController.RemoveStudent)


export { studentRouter }