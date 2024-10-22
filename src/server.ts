import express from "express"
import cors from "cors"
import path from "path"

import { initializeDatabase } from "./db/config/database"
import { departmentRouter } from "./routes/departmentRoutes"
import { employeeRouter } from "./routes/employeeRoutes"

import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./db/swagger/swaggerSepc"

const app = express()
const PORT = 5000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

initializeDatabase().then(() => {
  app.use(cors())
  app.use(express.json())

  app.get("/", (req, res) => {
    res.render("welcome", {title: "Employee Management System"})
  });

  app.use('/employees', employeeRouter)
  app.use('/departments', departmentRouter)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.listen(PORT, () =>  {
    console.log("SERVER IS UP AND RUNNING ON PORT : ", PORT)
  })
})
