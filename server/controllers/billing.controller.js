import { PLANS } from "../config/plan.js"
import User from "../models/user.model.js"
import stripe from "../config/stripe.js"

export const billing = async (req, res) => {
    try {
        const { planType } = req.body
        const userId = req.user._id
        const plan = PLANS[planType]
        if (!plan || plan.price == 0) {
            return res.status(400).json({ message: "invalid paid plan" })
        }

        const isStripeConfigured =
            process.env.STRIPE_SECRET_KEY &&
            !process.env.STRIPE_SECRET_KEY.includes("add your") &&
            process.env.STRIPE_SECRET_KEY.startsWith("sk_")

        // Demo / Sandbox mode for College Projects (when Stripe key is not available)
        if (!isStripeConfigured) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $inc: { credits: plan.credits },
                    plan: plan.plan
                },
                { new: true }
            )

            return res.status(200).json({
                success: true,
                demoMode: true,
                message: `Successfully upgraded to ${plan.plan.toUpperCase()}! Added ${plan.credits} credits.`,
                user: updatedUser
            })
        }

        // Real Stripe checkout session (if Stripe key is configured)
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Genweb.ai ${planType.toUpperCase()} plan`
                        },
                        unit_amount: plan.price * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId: userId.toString(),
                credits: plan.credits,
                plan: plan.plan
            },
            success_url: `${process.env.FRONTEND_URL}/`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`
        })

        return res.status(200).json({
            sessionUrl: session.url
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `billing error: ${error}` })
    }
}