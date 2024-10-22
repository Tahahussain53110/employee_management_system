import express from "express"
import { getUsers, getUser, updateUser, getUserHierarchy } from "../controllers/employeeController"

// employeeRoutes.ts
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API endpoints related to employees
 */

const employeeRouter = express.Router()

/**
 * @swagger
 * /employees/all:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               employees:
 *                 - id: employeeId
 *                   firstname: firstName
 *                   lastname: lastName
 *                   jobtitle: jobTitle
 *                   departmentid: departmentId
 *                   managerid: managerId
 */
employeeRouter.get('/all', getUsers)

/**
 * @swagger
 * /employees/user/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 id: employeeId
 *                 firstname: firstName
 *                 lastname: lastName
 *                 jobtitle: jobTitle
 *                 departmentid: departmentId
 *                 managerid: managerId
 */
employeeRouter.get('/user/:id', getUser)

/**
 * @swagger
 * /employees/user/update/{id}:
 *   put:
 *     summary: Update an employee's information
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updateUserInfo:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   jobTitle:
 *                     type: string
 *                   departmentId:
 *                     type: string
 *                   managerId:
 *                     type: string
 *             required:
 *               - updateUserInfo
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 id: employeeId
 *                 firstname: firstName
 *                 lastname: lastName
 *                 jobtitle: jobTitle
 *                 departmentid: departmentId
 *                 managerid: managerId
 */
employeeRouter.put('/user/update/:id', updateUser)

/**
 * @swagger
 * /employees/user/hierarchy/{id}:
 *   get:
 *     summary: Get employee complete hirerahy
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 id: employeeId
 *                 firstname: firstName
 *                 lastname: lastName
 *                 jobtitle: jobTitle
 *                 departmentid: departmentId
 *                 managerid: managerId
 *               manager:
 *                 id: employeeId
 *                 firstname: firstName
 *                 lastname: lastName
 *                 jobtitle: jobTitle
 *                 departmentid: departmentId
 *                 managerid: managerId
 *               department:
 *                 id: departmentId
 *                 name: departmentName
 *
 */

employeeRouter.get('/user/hierarchy/:id', getUserHierarchy)

export { employeeRouter }
