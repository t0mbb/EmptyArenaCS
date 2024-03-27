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
        required: true
    },
    fileSize: {
        type : Number,
        required : true
    },
    fileName:{
        type : String, 
        required : true
    },
    UploadDate:{
        type : Date,
        required : true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('fileUpload', fileUpload);
