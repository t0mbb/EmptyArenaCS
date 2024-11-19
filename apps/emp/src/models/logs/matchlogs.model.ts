import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const matchlogs= new mongoose.Schema(
  {
    playername1 : {
        type: String
    },
    playername2 : {
        type : String
    },
    scoreP1 : { 
        type : Number
    },
    scoreP2 : {
        type : Number
    },
    time : {
        type : Date
    },
    validate: { 
        type : String

    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('match', matchlogs);
