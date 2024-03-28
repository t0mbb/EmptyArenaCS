import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const fileUpload = new mongoose.Schema(
  {
    contribution_id:{
        type: ObjectId,
        ref:'contribution',
        required:true
    },
    filepath: {
        type: String,

    },
    fileSize: {
        type : Number,

    },
    fileName:{
        type : String, 
   
    },
    UploadDate:{
        type : Date,
  
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('fileUpload', fileUpload);



