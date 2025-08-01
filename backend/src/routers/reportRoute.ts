import express from "express"
import { getDashboard, getFavourite } from "../controllers/reportController"
import { verifyRole, verifyToken } from "../../src/middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/dashboard`, [verifyToken, verifyRole(["USER", "MANAGER"])], getDashboard)
app.get(`/favorite`, [verifyToken, verifyRole(["USER", "MANAGER"])], getFavourite)

export default app