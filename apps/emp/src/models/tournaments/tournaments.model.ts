import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;
export enum TypeTournaments {
  Single = 'Single',
  Double =  'Double',
}

export enum totalmember {
  P16 = '16',
  P32 = '32',
  P64 = '64',
}
const tournaments = new mongoose.Schema(
  {
    name :{
      type : String,
    },
    details : {
      type : String,
     },
    time : {
        type : Date,
     },
    totalmember : {
        type : Number
    },
    type :{
      type : String,
      enum : TypeTournaments
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('tournaments', tournaments);
