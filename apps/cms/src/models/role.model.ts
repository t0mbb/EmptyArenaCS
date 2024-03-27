import mongoose from 'mongoose';

const role = new mongoose.Schema(
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

export default mongoose.model('role', role);
