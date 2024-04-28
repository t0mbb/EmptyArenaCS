import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const order_items = new mongoose.Schema(
  {
    product_id: {
      type: ObjectId,
      ref: 'product',
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('order_items', order_items);
