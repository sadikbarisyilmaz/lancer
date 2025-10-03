import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const ClientNoteSchema = new Schema(
  {
    created_at: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    client_id: { type: Schema.Types.ObjectId, ref: "Client", default: null },
  },
  { timestamps: false }
);

export async function getClientNoteModel() {
  await connectToDatabase();
  return models.ClientNote || model("ClientNote", ClientNoteSchema);
}
