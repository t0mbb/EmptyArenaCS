import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const membershipCards = new mongoose.Schema(
  {
    account_id: {
      type: ObjectId,
      ref: 'account',
      required: true,
    },
    membership_type_id: {
      type: ObjectId,
      ref: 'membership_types',
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('membership_cards', membershipCards);
