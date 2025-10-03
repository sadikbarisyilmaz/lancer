import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const TaskSchema = new Schema(
  {
    created_at: { type: Date, default: Date.now },
    set_date: { type: Date, required: true },
    set_time: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    client_id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    fee: { type: Number, required: true },
    payment_status: { type: String, required: true },
    frequency: { type: String, required: true },
  },
  { timestamps: false }
);

export async function getTaskModel() {
  await connectToDatabase();
  return models.Task || model("Task", TaskSchema);
}
