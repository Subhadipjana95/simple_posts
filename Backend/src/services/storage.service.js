const ImageKit = require('@imagekit/nodejs');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const uploadImage = async function uploadImage(buffer, filename) {
    try{
        const result = await imageKit.files.upload({
            file: buffer.toString('base64'),
            fileName: filename,
        })
        return result;
    }
    catch(err){
        console.error(err.message);
        throw new Error('Image upload failed');
    }
}

module.exports = uploadImage;