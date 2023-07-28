import { Schema, model } from "mongoose";
import User from "./user.model.js";

const PasswordResetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    resetToken: {
      type: String,
      required: true,
    },

    expiresIn: {
      type: Date,
      default: new Date(new Date().getTime() + 30 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const PasswordReset = model("PasswordReset", PasswordResetSchema);

export default PasswordReset;
