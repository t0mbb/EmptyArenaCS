import mongoose from 'mongoose';

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require : true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('category', category);
