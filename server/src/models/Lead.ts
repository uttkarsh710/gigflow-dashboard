import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["website", "instagram", "referral"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);