import mongoose from "mongoose";
import User from "./user.models.js";

const Professional = User.discriminator("Professional",
  new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['professional'],  
      default: 'professional'
    }
  },
  {
    timestamps: true,
  }
));

export default Professional;
