// import mongoose from "mongoose"

// const connectDb=async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db connected")
//     } catch (error) {
//         console.log("db error")
//     }
// }

// export default connectDb

import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}
export default main;