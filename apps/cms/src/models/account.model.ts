import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const account = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    role_id: {
      type: ObjectId,
      ref: 'Role',
      required: true,
    },
    name: {
      type: String,
      maxLength: 32,
      required: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
      maxLength: 255,
    },
    hashed_password: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('account', account);
