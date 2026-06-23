import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Song from "../models/song.model.js"
import Album from "../models/album.model.js"
import { uploadAudioToCloudinary, uploadImageToCloudinary, deleteAudioFromCloudinary, deleteImageFromCloudinary } from "../helper/cloudinary.js"


export const addSong = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "You are not admin")
    }
    const { title, description, singer, album } = req.body;

    const buffer = req.file?.buffer;

    if (!buffer) {
        throw new ApiError(400, "Audio field is necessary to create song")
    }

    const audio = await uploadAudioToCloudinary(buffer);

    if (!audio) {
        throw new ApiError(500, "failed to upload audio file.")
    }

    await Song.create({
        title,
        description,
        singer,
        audio: audio.url,
        audioPublicId: audio.public_id,
        album
    })

    return res.status(201).json(
        new ApiResponse(201, null, "Song created successully.")
    )


})

export const addThumbnail = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "You are not admin");
    }

    const song = await Song.findById(req.params.id);

    if (!song) {
        throw new ApiError(404, "Song not found");
    }

    const buffer = req.file?.buffer;

    if (!buffer) {
        throw new ApiError(400, "Image is necessary to add thumbnail");
    }

    
    if (song.thumbnailPublicId) {
        await deleteImageFromCloudinary(song.thumbnailPublicId);
    }

    const thumbnail = await uploadImageToCloudinary(buffer);

    if (!thumbnail) {
        throw new ApiError(500, "Failed to upload thumbnail to song");
    }

    song.thumbnail = thumbnail.url;
    song.thumbnailPublicId = thumbnail.public_id;

    await song.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Thumbnail added successfully"
        )
    );
});



export const getSingleSong = asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, song, "Song fetched successfully.")
    )
})

export const getAllSongs = asyncHandler(async (req, res) => {
    const songs = await Song.find();

    return res.status(200).json(
        new ApiResponse(200, songs, "All Songs fetched sucessfully.")
    )

})

export const getAllSongsByAlbum = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    const songs = await Song.find({ album: req.params.id })

    return res.status(200).json(
        new ApiResponse(200, { album, songs }, "All Album with respective songs fetched successfully.")
    )
})

export const deleteSong = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "You are not admin")
    }

    const song = await Song.findById(req.params.id);

    if (!song) {
        throw new ApiError(404, "Song not found.");
    }

    if (song.audioPublicId) {
        await deleteAudioFromCloudinary(song.audioPublicId)
    }

    if (song.thumbnailPublicId) {
        await deleteImageFromCloudinary(song.thumbnailPublicId)
    }

    await song.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, "Song deleted successfully.")
    )

})

