import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const schedule = new mongoose.Schema(
  {
   accHostID : {
    type : ObjectId,
    ref : 'account'
   },
   oppoAccID : {
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

export default mongoose.model('schedule', schedule);
