import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp = pgPromise()

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

export const db = pgp(dbConfig)

export const initializeDatabase = async () => {
  const adminDbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
  const adminDb = pgp(adminDbConfig)

  const result = await adminDb.oneOrNone(`SELECT 1 FROM pg_database WHERE datname = 'employeestimeline'`)
  if (!result) {
      try {
          await adminDb.none(`CREATE DATABASE employeestimeline`)
      } catch (error) {
          console.log('Error creating database:', error)
      }
  }

  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS department (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `)
    await db.none(`
      CREATE TABLE IF NOT EXISTS employee (
        id VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        jobTitle VARCHAR(255) NOT NULL,
        departmentId VARCHAR(255) NOT NULL REFERENCES department(id),
        managerId VARCHAR(255)
      )
    `)
  } catch (error) {
      console.error('Error Initializing Database : ', error)
  }
}
