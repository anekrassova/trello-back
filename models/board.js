import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Board =
  mongoose.models.Board || mongoose.model('Board', boardSchema);
