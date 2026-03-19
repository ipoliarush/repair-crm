import express from "express"
import { auth } from "../middleware/auth.js"
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js"

const router = express.Router()

// 🔐 всі маршрути захищені
router.use(auth)

router.post("/", createOrder)
router.get("/", getOrders)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export default router