import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: { type: String, require: true },
  role: { type: String, default: "USER" },
  name: { type: String, require: false },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const UserAmlak = models.UserAmlak || model("UserAmlak", userSchema);
export default UserAmlak;
