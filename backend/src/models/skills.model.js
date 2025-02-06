import mongoose from "mongoose";


const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    // experience: {
    //   type: Number,
    //   required: true,
    // },
    // barterPreferences: [
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Skill", skillSchema);
