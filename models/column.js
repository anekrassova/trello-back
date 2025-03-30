import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    position: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Column =
  mongoose.models.Column || mongoose.model('Column', columnSchema);
