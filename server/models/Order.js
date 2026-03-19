import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },

  phone: String,
  address: String,
  deviceType: String,
  problem: String,

  status: {
    type: String,
    default: "new"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

export default mongoose.model("Order", OrderSchema)