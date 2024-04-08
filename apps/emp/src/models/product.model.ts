import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const product = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require : true
    },
    price : {
      type: Number,
      require : true
    },
    description: {
        type: String,
      },
    quantity_in_stock : {
        type: Number,
        require : true
    },
    category_id : {
        type : ObjectId , 
        ref : 'category'
    },
    types : {
        type : String ,
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('product', product);
