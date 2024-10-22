import { Request, Response } from "express"
import { db } from '../db/config/database'

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await db.any('SELECT * FROM department')
    res.json(departments)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const department = await db.one('SELECT * FROM department WHERE id = $1', [id])
    res.json(department)
  } catch (error) {
    res.status(500).json(error)
  }
}
