import mongoose from "mongoose"
import {DB_NAME} from "../helper/constant.js"

const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`✅ mongoDB connected || DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("❌ mongoDB connection error",error.message)
        process.exit(1);
    }
}

export default connectDB;