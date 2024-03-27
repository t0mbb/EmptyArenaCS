import mongoose from 'mongoose';

const faculty = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 16,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('faculty', faculty);
