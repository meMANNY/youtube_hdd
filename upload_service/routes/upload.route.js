import express from 'express';
import multer from "multer";
import uploadFiletoS3 from '../controllers/upload.controller';

const upload = multer();

const router = express.Router();

// export default router;

router.post('/', upload.single('file'), uploadFiletoS3);

import AWS from 'aws-sdk';

const uploadFiletoS3 = async (req, res) => {
    console.log("Upload req received"); 
    if(!req.file){
        console.log("Missing required fields");
        return res.status(400).send("Invalid request");
    }
    const file = req.file;
    AWS.config.update({
        region: 'ap-south-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
    }
    const s3 = new AWS.S3();

    
    s3.upload(params, (err, data) => {
        if(err){
            console.log("Error uploading files",err);
            return res.status(500).send("Internal server error");
        }
        console.log('File uploaded successfully. Location: ',data.Location);
        return res.status(200).send("File uploaded successfully");
    });
}

export default uploadFiletoS3;