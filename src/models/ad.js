import { Schema, model, models } from "mongoose";
import UserAmlak from "./user";

const adSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: Number, required: true },
    realState: { type: String, required: true },
    constractionDate: { type: Date, required: true },
    category: {
      type: String,
      enum: ["villa", "department", "office", "store"],
    },
    rules: { type: [String], default: [] },
    options: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: UserAmlak },
  },
  { timestamps: true },
);

const AD = models.AD || model("AD", adSchema);
export default AD;
