import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const ClientSchema = new Schema(
  {
    created_at: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: false }
);

export async function getClientModel() {
  await connectToDatabase();
  return models.Client || model("Client", ClientSchema);
}
