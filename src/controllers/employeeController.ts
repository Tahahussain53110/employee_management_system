import { Request, Response } from 'express'
import { db } from '../db/config/database'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const employees = await db.any('SELECT * FROM employee')
    res.json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const employee = await db.one('SELECT * FROM employee WHERE id = $1', [id])
    res.json(employee)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { updateUserInfo } = req.body
    const employee = await db.one('UPDATE employee SET id = $1, firstName = $2, lastName = $3, jobTitle = $4, departmentId = $5, managerId = $6 WHERE id = $1 RETURNING *',
      [
        id,
        updateUserInfo.firstName,
        updateUserInfo.lastName,
        updateUserInfo.jobTitle,
        updateUserInfo.departmentId,
        updateUserInfo.managerId,
      ]
    )
    res.json(employee)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUserHierarchy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    let userHierarchy = {}
    const employee = await db.one('SELECT * FROM employee WHERE id = $1', [id])
    const department = await db.one('SELECT * FROM department WHERE id = $1', [employee.departmentid])
    if (employee.managerid) {
      const manager = await db.oneOrNone('SELECT * FROM employee WHERE id = $1', [employee.managerid])
      userHierarchy = { employee, manager, department }
    } else {
      userHierarchy = { employee, manager: {} , department }
    }

    res.json(userHierarchy)
  } catch (error) {
    res.status(500).json(error)
  }
}
