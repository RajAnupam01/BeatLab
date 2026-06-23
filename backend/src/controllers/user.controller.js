import User from "../models/user.model.js";
import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const myProfile = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id).select("-password -refreshToken")

  return res.status(200).json(
    new ApiResponse(200,user, "User data fetched successfully.")
  )
})

export const saveToPlaylist = asyncHandler(async(req,res)=>{
   const user = await User.findById(req.user._id);

   if(!user){
    throw new ApiError(404,"User not found.")
   }

   if(user.playlist.includes(req.params.id)){
     const index = user.playlist.indexOf(req.params.id)

     user.playlist.splice(index,1);

     await user.save();

     return res.status(200).json(
        new ApiResponse(200,null,"Removed from playlist.")
     )
   }
   user.playlist.push(req.params.id)

   await user.save();

   return res.status(200).json(
    new ApiResponse(200,null,"Added to playlist.")
   )
})

