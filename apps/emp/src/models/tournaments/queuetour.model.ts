import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const queuetour = new mongoose.Schema(
  {
    accountId : { 
        type : ObjectId,
        ref : 'account'
    },
    tourId : {
        type: ObjectId,
        ref : 'tournaments'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('queuetour', queuetour);
