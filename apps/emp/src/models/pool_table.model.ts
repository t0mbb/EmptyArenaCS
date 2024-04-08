import mongoose from 'mongoose';
export enum StatusName {
  AVAILABLE = 'available',
  USED = 'used',
  MAINTAINED = 'maintained',
}
export enum BrandName {
  KKING = 'kking',
  PREDATOR = 'predator',
  AILEEX = 'aileex',
}
const pool_table = new mongoose.Schema(
  {
    number: {
      type: Number,
      unique: true,
      require : true
    },
    brandname : {
      type : String , 
      require : true,
      enum: BrandName
    },
    price : {
      type: Number,
      require : true
    },
    status :{
      type : String,
      enum: StatusName,
      require : true
    }
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('pool_table', pool_table);
