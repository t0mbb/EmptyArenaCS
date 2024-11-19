import mongoose, { InferSchemaType, } from 'mongoose';

const { ObjectId } = mongoose.Schema;
export enum Ranking {
  LvlPRO = 'PRO',
  LvlA = 'A',
  LvlB = 'B',
  LvlC = 'C',
  LvlD = 'D',
  LvlE = 'E',
  LvlF = 'F',
  LvlG = 'G',
  LvlH = 'H',
  UNRANK = 'UNRANK'
}
const rank = new mongoose.Schema(
  {
    name :{
      type : String,
      enum: Ranking,
      unique : true
    },
    min_elo : {
        type : Number
    },
    max_elo : {
        type : Number
    }
  },
  {
    timestamps: true,
  }
);
export type Rank = InferSchemaType<typeof rank>;
export default mongoose.model('rank', rank);
