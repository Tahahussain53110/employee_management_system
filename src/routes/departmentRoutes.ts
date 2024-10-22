import express from "express"
import { getDepartments, getDepartment } from "../controllers/departmentController"

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API endpoints related to departments
 */

const departmentRouter = express.Router()

/**
 * @swagger
 * /departments/all:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               departments:
 *                 - id: departmentId
 *                   name: departmentName
 */
departmentRouter.get('/all', getDepartments)

/**
 * @swagger
 * /departments/department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the department
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               department:
 *                 id: departmentId
 *                 name: departmentName
 */
departmentRouter.get('/department/:id', getDepartment)

export { departmentRouter }
