import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import fileUploadModel from '../models/fileUpload.model';

const account = process.env.account;
const accountKey = process.env.accountKey;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = process.env.containerName;

export const createBlob = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = 'Hello world!';
    const blobName = 'newblob' + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      content,
      content.length
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
  } catch (error) {
    next(error);
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const fileBuffer = req.file.buffer;
    const fileType = req.file.originalname.split('.').at(-1);
    const fileName = `${req.body.contribution_id}_${Date.now()}.${fileType}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);

    const fileDetails = new fileUploadModel({
      contribution_id: req.body.contribution_id,
      filepath: blockBlobClient.url,
      fileSize: req.file.size,
      fileName: fileName,
      UploadDate: new Date(),
    });
    await blockBlobClient.uploadData(fileBuffer);
    await fileDetails.save();

    res.send('File uploaded successfully!');
  } catch (err) {
    next(err);
  }
};
