import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null)
        if (!token) {
            return res.status(200).json(null)
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(200).json(null)
        }
        const userObj = user.toObject ? user.toObject() : JSON.parse(JSON.stringify(user))
        return res.status(200).json({ ...userObj, token })
    } catch (error) {
        return res.status(200).json(null)
    }
}
