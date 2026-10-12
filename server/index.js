import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

const app=express()

app.set("trust proxy", 1)

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 8000
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || (process.env.FRONTEND_URL && origin.includes("vercel.app"))) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)


app.listen(port,()=>{
    console.log("server started")
    connectDb()
})