import {
  BlobSASPermissions,
  BlobSASSignatureValues,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';

import fileUploadModel from '../models/fileUpload.model';
import archiver from 'archiver';
const account = process.env.account;
const accountKey = process.env.accountKey;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = process.env.containerName;
const containerZip = process.env.CONTAINERZIP;

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

export const downloadFile = async (req, res, next) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(req.body.fileName);
    const download = await blobClient.downloadToBuffer();
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.append(download, { name: req.body.fileName });
    archive.finalize();

    const time = `${Date.now()}.zip`;
    const oneDayInMilliseconds = 24 * 3600 * 1000;
    const containerDownload =
      blobServiceClient.getContainerClient(containerZip);
    const zipClient = containerDownload.getBlockBlobClient(time);
    await zipClient.uploadStream(archive);
    const currentTime = new Date();

    const sasOptions: BlobSASSignatureValues = {
      containerName: containerZip,
      blobName: time,
      startsOn: currentTime,
      expiresOn: new Date(currentTime.valueOf() + oneDayInMilliseconds * 7),
      permissions: BlobSASPermissions.parse('r'),
    };

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      sharedKeyCredential
    ).toString();
    const blobSasUri = `${
      containerDownload.getBlockBlobClient(time).url
    }?${sasToken}`;

    res.json(blobSasUri);
  } catch (err) {
    next(err);
  }
};
