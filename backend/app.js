import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dns from "dns"
import cookieParser from "cookie-parser"
dotenv.config()
dns.setServers(["1.1.1.1","0.0.0.0"])
import {errorHandler} from "./src/middlewares/globalError.middleware.js"


const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.get("/",(_,res)=>{
    res.send("Backend is running successfully 🚀")
})

app.use(express.json())
app.use(cookieParser())



import authRoutes  from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import songRoutes from "./src/routes/song.routes.js"
import albumRoutes from "./src/routes/album.routes.js"


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/song",songRoutes)
app.use("/api/album",albumRoutes)

app.use(errorHandler);

export default app;