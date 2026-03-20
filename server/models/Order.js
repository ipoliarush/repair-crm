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
    enum: [
      "in_progress",
      "after_visit",
      "parts",
      "workshop_repair",
      "workshop_diagnostics",
      "info_insurance",
      "waiting_decision",
      "invoice",
      "closed",
      "consultation"
    ],
    default: "in_progress"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true })

export default mongoose.model("Order", OrderSchema)