import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.id
    })

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}