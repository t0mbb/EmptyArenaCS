import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob"
import fileUploadModel from "../models/fileUpload.model";
import multer from "multer";
const account = process.env.account
const accountKey = process.env.accountKey

const upload = multer();

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = process.env.containerName

export const createBlob = async (req, res, next) => {
    try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    const content = "Hello world!";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}
  catch(error)
  {
    next(error);
  }
  }


  export const uploadFile = async (req, res, next) => {
    try {
      const containerClient = blobServiceClient.getContainerClient(containerName);
  
      // Using upload.single("file") to handle single file upload with the field name "file"
      upload.single("file")(req, res, async function (err) {
        if (err) {
          return next(err);
        }
  
        const fileBuffer = req.file.buffer; 
        const fileName = req.file.originalname  
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(fileBuffer);


        const fileDetails = new fileUploadModel({
          contribution_id: req.body.contribution_id,
          filepath: blockBlobClient.url,
          fileSize: req.file.size,
          fileName: fileName,
          UploadDate: new Date()
        });
        await fileDetails.save();
  
        res.send("File uploaded successfully!");
      });
    } catch (err) {
      next(err);
    }
  };