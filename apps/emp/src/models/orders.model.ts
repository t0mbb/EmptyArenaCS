import mongoose, { InferSchemaType, ObjectId } from 'mongoose';
const { ObjectId } = mongoose.Schema;
const orders = new mongoose.Schema(
  {
    pool_table_id : {
      type : ObjectId,
      ref : 'pool_table',
      unique : true
    },
    order_items_id : {
      type : ObjectId,
      ref : 'order_items',
    },
    start_time : {
      type : Date,
    },
    end_time : {
      type : Date,
    },
    total_cost : {
      type : Number
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model('orders', orders);


