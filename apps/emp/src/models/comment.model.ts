import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const comment = new mongoose.Schema(
  {
    account_id: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    contribution_id: {
      type: ObjectId,
      ref: 'contribution',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('comment', comment);
