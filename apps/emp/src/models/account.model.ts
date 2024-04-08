import mongoose, { InferSchemaType, } from 'mongoose';

export enum RoleName {
  ADMIN = 'admin',
  STAFF = 'staff',
  GUEST = 'guest',
}
const account = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type : String,
      enum: RoleName,
      maxLength: 32,
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
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model('account', account);
