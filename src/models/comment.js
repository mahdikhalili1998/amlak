import { Schema, model, models } from "mongoose";
import UserAmlak from "./user";
import AD from "./ad";

const cmSchema = new Schema(
  {
    text: { type: String, required: true },
    email: { type: String, required: true },
    adminAnswer: { type: String, require: false },
    published: { type: Boolean, default: false },
    ad_id: { type: Schema.Types.ObjectId, ref: AD },
    userId: { type: Schema.Types.ObjectId, ref: UserAmlak },
  },
  { timestamps: true },
);

const Comments = models.Comments || model("Comments", cmSchema);
export default Comments;
