import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    column: { type: Schema.Types.ObjectId, ref: 'Column', required: true },
    description: { type: String, default: '' },
    position: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Card = mongoose.model('Card', cardSchema);
