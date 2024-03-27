import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const account = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    role_id: {
      type: ObjectId,
      ref: 'role',
      required: true,
    },
    fullname: {
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
    password: {
      type: String,
      required: true,
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
