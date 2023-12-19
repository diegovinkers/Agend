import mongoose from "mongoose";
import User from "./user.models.js";

const Patient = User.discriminator("Patient",
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
      enum: ['patient'],  
      default: 'patient'
    }
  },
  {
    timestamps: true,
  }
));


export default Patient;