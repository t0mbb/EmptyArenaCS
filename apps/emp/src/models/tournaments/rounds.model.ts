import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const rounds = new mongoose.Schema(
  { number : {
      type : Number,
    },
    bracketsId :{
        type: ObjectId,
        ref: 'Brackets'
    },
    accountId1 : {
        type : ObjectId,
    },
    accountId2 : {
        type : ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('rounds', rounds);
