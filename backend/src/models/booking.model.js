import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["offering", "requesting"],
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillsToLearn: [
      {
        type: String,
        required: true,
      },
    ],
    date: {
      type: Date,

    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    isBarterExchange: {
      type: Boolean,
      default: false,
    },
    barterSkill: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);
