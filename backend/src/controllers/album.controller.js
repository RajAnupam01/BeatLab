import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/AsyncHandler.js";
import Album from "../models/album.model.js";
import {  uploadImageToCloudinary} from "../helper/cloudinary.js"

export const createAlbum = asyncHandler(async(req,res)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403,"You are not admin")
    }

    const {title,description} = req.body;

    const buffer = req.file?.buffer;

    if(!buffer){
        throw new ApiError(400,"image is necessary to add thumbnail");
    }

    const thumbnail = await uploadImageToCloudinary(buffer);

    if(!thumbnail){
        throw new ApiError(500,"Failed to upload thumbnail to album")
    }

    await Album.create({
        title,
        description,
        thumbnail:thumbnail.url,
        thumbnailPublicId:thumbnail.public_id
    })

    return res.status(201).json(
        new ApiResponse(201,null,"Album added successfully.")
    )
})

export const getAllAlbums = asyncHandler(async(req,res)=>{
  const albums = await Album.find();

  return res.status(200).json(
    new ApiResponse(200,albums,"All albums fetched successfully.")
  )
})

