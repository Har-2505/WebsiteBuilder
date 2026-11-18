import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

let isConnected = false;
async function main() {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("DB is connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}
export default main;
