import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse
} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

type UploadResponse =
  | { success: true; result: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

export const uploadImageToCloudinary = (
  imageUri: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(imageUri, {
        invalidate: true,
        resource_type: 'auto',
        folder: 'savory-point'
      })
      .then((result) => resolve({ success: true, result }))
      .catch((error) => reject({ success: false, error }));
  });
};
