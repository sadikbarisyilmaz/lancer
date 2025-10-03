import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const WeeklySchema = new Schema(
  {
    created_at: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    client_id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    week_day: { type: String, required: true },
    set_time: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    fee: { type: Number, required: true },
    payment_status: { type: String, required: true },
  },
  { timestamps: false }
);

export async function getWeeklyModel() {
  await connectToDatabase();
  return models.Weekly || model("Weekly", WeeklySchema);
}
