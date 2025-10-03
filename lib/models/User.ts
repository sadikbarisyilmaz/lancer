import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    avatar_url: { type: String, default: null },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: false }
);

export async function getUserModel() {
  await connectToDatabase();
  return models.User || model("User", UserSchema);
}
