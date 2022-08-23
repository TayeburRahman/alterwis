const cloudinary = require('cloudinary');
const config = require('../config/keys');

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            console.log(result)
            resolve({
                file: result.secure_url,
                id: result.public_id,
                fileType: result.resource_type,
                mimeType: result.format,
            })
        }, {
            resource_type: "auto",
            folder
        })
    })
}