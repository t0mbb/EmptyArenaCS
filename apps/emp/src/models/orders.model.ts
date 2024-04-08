import mongoose, { InferSchemaType, ObjectId } from 'mongoose';
const { ObjectId } = mongoose.Schema;
const orders = new mongoose.Schema(
  {
    pool_table_id : {
      type : ObjectId,
      ref : 'pool_table',
    },
    account_id : {
      type : ObjectId,
      ref : 'account',
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


