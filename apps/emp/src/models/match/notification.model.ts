import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const notification = new mongoose.Schema(
  {
   accountID : {
    type : ObjectId,
    ref : 'account'
   },
   details : {
    type : String
   },
   scheduleID : {
    type : ObjectId,
    ref : 'scheduleID'
   },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('notification', notification);
