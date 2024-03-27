import mongoose, { InferSchemaType, } from 'mongoose';
import { Role } from './role.model';

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

export type Account = InferSchemaType<typeof account>;

export interface PopolatedAccount extends Omit<Account, 'role_id'> {
  role_id: Role,
}

export default mongoose.model('account', account);
