import app from "./app.js"
import connectDB from "./src/config/db.js"



const startServer = async()=>{
    try {
        await connectDB();
        const PORT = process.env.PORT|| 3000

        app.listen(PORT,()=>{
            console.log(`🚀 Server is running at PORT: ${PORT}`)
        })

    } catch (error) {
            console.log("🚫 server failed to connect", error)
    }
}

startServer()

