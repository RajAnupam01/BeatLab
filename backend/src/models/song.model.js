import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    thumbnailPublicId:{
    type: String,
    },
    audio:{
        type:String,
    },
    audioPublicId:{
        type:String,
    },
    album:{
        type:String,
        required:true
    }
},{timestamps:true})

const Song = mongoose.model("Song",songSchema);

export default Song;