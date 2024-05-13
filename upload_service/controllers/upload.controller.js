import AWS from 'aws-sdk';

import fs from "fs";


const uploadFiletoS3 = async (req, res) => {
    console.log("Upload req received");
    console.log(req.files);

    // if(!req.files|| !req.files['chunck'] || !req.body['totalChuncks'] || !req.body['chunckIndex']){
    //     console.log("Missing required fields");
    //     return res.status(400).send("Invalid request");
    // }

    // const chunck = req.files['chunck'];
    // const filename =  req.body['filename'];
    // const totalChuncks = parseInt(req.body['totalChuncks']);
    // console.log(filename);

    // console.log(chunk[0].buffer);

    const filepath = `./uploads/${filename}`;
    if(!fs.existsSync(filepath)){
        console.log("File not found");
        return;
    }

    AWS.config.update({
        region: 'ap-south-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "dsa.png",
        Body: fs.createReadStream(filepath),
    }

    // if(req.body.totalChuncks && req.body.chunckIndex !== undefined){
    //     const params ={
    //         Bucket: process.env.AWS_BUCKET_NAME,
    //         Key:`${filename}_${chunkIndex}`,
    //         Body: chunk[0].buffer,
    //     }
    

    const s3 = new AWS.S3();
    // s3.upload(params, (err, data) => {
    //     if(err){
    //         console.log(err);
    //         return res.status(500).send("Internal server error");
    //     }
    //     console.log('chuck uploaded successfully. Location: ',data.location);
    //     return res.status(200).send("File uploaded successfully");
    // });
    // //     }
    //     else {
    //         console.log('Missing chunk metadata');
    //         res.status(400).send('Missing chunk metadata');
    //     }

    s3.upload(params, (err, data) => {
        if(err){
            console.log("Error uploading files",err);
            return res.status(500).send("Internal server error");
        }
        console.log('File uploaded successfully. Location: ',data.Location);
        return res.status(200).send("File uploaded successfully");
    });
};

export default uploadFiletoS3;