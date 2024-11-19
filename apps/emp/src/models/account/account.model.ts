import mongoose, { InferSchemaType, } from 'mongoose';
import { Rank } from './rank.model';

export enum RoleName {
  ADMIN = '$2a$12$OgjIqSg/4vTRczCIjTNXuuA1gewxE/JdRYnsBe4avjzK3ARFtrA6m',
  STAFF = '$2a$12$yYDaOIhmmY6BgKXx6sxJAOShiLrA/8C41MjlLEu4FQxDZ9kqRa9Nu',
  GUEST = 'guest',
}
const { ObjectId } = mongoose.Schema;

const account = new mongoose.Schema(
  {
    googleId : { 
      type : String,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique : true ,
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
    gender:{
      type: String,
    },
    address: {
      type: String,
      maxLength: 255,
    },
    cues : {
      type : String
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique:true
    },
    rankID : {
      type: ObjectId,
      ref : 'rank'
    },
    elo : { 
      type : ObjectId
    },
    rankname :{
      type : String
    },

  },
  {
    timestamps: true,
  }
);

export type Account = InferSchemaType<typeof account>;
// ROLE ID tu db sang la type string , khi populate vao bang se khong bi o dang string
export interface PopolatedAccount extends Omit<Account, 'rankID'> {
  rankID: Rank,
}

export default mongoose.model('account', account);
