import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const pending = new mongoose.Schema(
  {
    Player1ID : {
    type : ObjectId,
    ref : 'account'
   },
   Player2ID : {
    type : ObjectId,
    ref : 'account'
   },
   time : {
    type : Date
   },
   date : {
    type : Date
   }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('pending', pending);
