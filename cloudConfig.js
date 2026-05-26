const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    // leftside name must be this 
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET

});

// kaha pe ja ke kon se folder pe save karna  hai cloudinary ke
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'safarstay_DEV',
    allowedFormats: ["png","jpg","jpeg"]
  },
});


module.exports={
    cloudinary,
    storage
}