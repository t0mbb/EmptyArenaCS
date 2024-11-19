import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const match = new mongoose.Schema(
  {
    
    accountId1 : { 
        type : ObjectId,
        ref : 'account',
        unique : true
    },
    accountId2:{
        type : ObjectId,
        ref : 'account',
        unique : true
    },
    tourId :{
        type : ObjectId,
        ref : 'tournaments'
    },
    daytime : {
        type : Date 
    },
    validation : {
        type : Boolean 
    },
    scoreP1 : { 
        type : Number
    },
    scoreP2 : {
        type : Number
    },
    elopoint : {
        type : Number
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('match', match);
