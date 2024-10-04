import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = async (file: string, options?: UploadApiOptions) => {
  const result = await cloudinary.uploader.upload(file, options);
  return result.secure_url;
};

export { upload };
