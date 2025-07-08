import express from "express"
import { getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct } from "../controllers/productController"
import { verifyAddProduct, verifyEditProduct } from "../middlewares/productValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/productUpload"

const app = express()
app.use(express.json())

app.get(`/`, getAllProducts)
app.post(`/`, [uploadFile.single("picture"), verifyAddProduct], createProduct)
app.put(`/:id`, [uploadFile.single("picture"), verifyEditProduct], updateProduct)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteProduct)

export default app