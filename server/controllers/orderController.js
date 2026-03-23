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
    const { search } = req.query

    let query = {}

    if (search) {
      query = {
        $or: [
          { clientName: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } }
        ]
      }
    }

    const orders = await Order.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.json({ message: "Order deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}