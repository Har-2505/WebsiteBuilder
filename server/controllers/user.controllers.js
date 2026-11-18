import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(200).json(null)
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(200).json(null)
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(200).json(null)
    }
}
