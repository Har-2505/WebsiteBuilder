import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null)
        if (!token) {
            return res.status(401).json({ message: "token not found" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        if (!req.user) {
            return res.status(401).json({ message: "user not found" })
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

export default isAuth
