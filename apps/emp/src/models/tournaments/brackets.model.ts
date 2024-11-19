import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const brackets = new mongoose.Schema(
  {
    tourId :{
        type: ObjectId,
        ref : 'tournaments'
    },
    roundId :{
        type : ObjectId,
        ref : 'rounds'
    },
    totalmember : {
      type : Number,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('brackets', brackets);
