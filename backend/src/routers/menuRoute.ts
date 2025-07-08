import express from "express"
import { getAllMenus, createMenu, updateMenu, deleteMenu } from "../controllers/menuController"
import { verifyAddMenu, verifyEditMenu } from "../middlewares/menuValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/menuUpload"

const app = express()
app.use(express.json())

app.get(`/`, getAllMenus)
app.post(`/`, [uploadFile.single("picture"), verifyAddMenu], createMenu)
app.put(`/:id`, [uploadFile.single("picture"), verifyEditMenu], updateMenu)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteMenu)

export default app