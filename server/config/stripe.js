import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe"

const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null

export default stripe