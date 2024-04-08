import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;
export enum MemberType {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond'
}
const membership_types = new mongoose.Schema(
  {
    name :{
      type : String,
      enum: MemberType
    },
    price: {
        type : Number,
    },
    durations: {
        type: String,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('membership_types', membership_types);
