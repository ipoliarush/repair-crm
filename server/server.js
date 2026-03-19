import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.js"
import orderRoutes from "./routes/orders.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT)
})

app.use("/api/orders", orderRoutes)