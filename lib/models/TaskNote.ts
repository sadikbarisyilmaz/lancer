import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

const TaskNoteSchema = new Schema(
  {
    created_at: { type: Date, default: Date.now },
    task_id: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    content: { type: String, required: true },
  },
  { timestamps: false }
);

export async function getTaskNoteModel() {
  await connectToDatabase();
  return models.TaskNote || model("TaskNote", TaskNoteSchema);
}
