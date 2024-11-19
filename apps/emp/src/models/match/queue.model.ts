import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const queue = new mongoose.Schema(
  {
    accountId : { 
        type : ObjectId,
        ref : 'account',
        unique : true
    },
    scoreP1 : { 
      type : Number
    },
    scoreP2 : {
      type : Number
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('queue', queue);
