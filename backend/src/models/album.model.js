import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String
    },
    thumbnailPublicId:{
        type:String
    }
},{timestamps:true})

const Album = mongoose.model("Album", albumSchema);

export default Album;