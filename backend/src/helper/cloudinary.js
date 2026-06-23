import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import {ApiError }from "../utils/ApiError.js"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const uploadImageToCloudinary = (buffer, folder = 'mern_02_img') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(new ApiError(500, "Cloudinary upload failed"));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    stream.end(buffer);
  });
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Image Destroy Error:", error.message, error.stack);

    throw new ApiError(500, "Failed to destroy image from Cloudinary");
  }
};

export const uploadAudioToCloudinary = (buffer, folder="mern_02_audio")=>{
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type:"video"
            },
            (error,result) =>{
                if(error){
                    return reject(
                        new ApiError(500,"Audio upload failed.")
                    )
                }
                resolve({
                    url:result.secure_url,
                    public_id:result.public_id
                })
            }
        )
        stream.end(buffer);
    })
}


export const deleteAudioFromCloudinary = async(publicId) =>{
    try {
        return await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type:"video"
            }
        )
    } catch (error) {
        throw new ApiError(500,"Failed to destroy audio from cloudinary")
    }
}