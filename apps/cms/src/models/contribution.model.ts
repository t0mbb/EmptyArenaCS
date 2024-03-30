import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const contribution = new mongoose.Schema(
  {
    account_id:{
        type: ObjectId,
        ref:'account',
        required:true
    },
    faculty_id:{
        type: ObjectId,
        ref:'faculty',
    },
    upload_date: {
        type: Date,
    },
    closure_date: {
        type: Date,

    },
    finalclosure_date: {
        type: Date,
    },
    status: {
        type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('contribution', contribution);
