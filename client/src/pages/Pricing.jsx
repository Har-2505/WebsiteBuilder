import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';

const plans = [
    {
        key: "free",
        name: "Free",
        price: "₹0",
        credits: 100,
        description: "Perfect to explore GenWeb.ai",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        popular: false,
        button: "Get Started",
    },
    {
        key: "pro",
        name: "Pro",
        price: "₹499",
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },
    {
        key: "enterprise",
        name: "Enterprise",
        price: "₹1499",
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    },
];

function Pricing() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const [loading, setLoading] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")

    const handleBuy = async (planKey) => {
        if (!userData) {
            navigate("/")
            return
        }
        if (planKey === "free") {
            navigate("/dashboard")
            return
        }
        setLoading(planKey)
        try {
            const result = await axios.post(`${serverUrl}/api/billing`, { planType: planKey }, { withCredentials: true })
            if (result.data.demoMode) {
                dispatch(setUserData(result.data.user))
                setSuccessMsg(result.data.message)
                setTimeout(() => {
                    navigate("/dashboard")
                }, 1800)
            } else if (result.data.sessionUrl) {
                window.location.href = result.data.sessionUrl
            }
        } catch (error) {
            console.log(error)
            setLoading(null)
        }
    }

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>

            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]' />
            </div>

            <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition' onClick={() => navigate("/")}>
                <ArrowLeft size={16} />
                Back
            </button>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-4xl mx-auto text-center mb-10"
            >
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 mb-4 font-medium'>
                    Demo Sandbox Active &bull; Instant Free Credit Top-up
                </div>
                <h1 className='text-4xl md:text-5xl font-bold mb-4'> Simple, transparent pricing</h1>
                <p className='text-zinc-400 text-lg'> Buy credits once. Build anytime.</p>
            </motion.div>

            {successMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-20 max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-medium shadow-xl backdrop-blur-md"
                >
                    🎉 {successMsg} (Redirecting to Dashboard...)
                </motion.div>
            )}

            <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileHover={{ y: -14, scale: 1.03 }}
                        className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all
              ${p.popular
                                ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
                            }`}
                    >
                        {p.popular && (
                            <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white shadow-lg shadow-indigo-500/40'>
                                Most Popular
                            </div>
                        )}

                        <h3 className='text-xl font-semibold mb-2'>{p.name}</h3>
                        <p className='text-sm text-zinc-400 mb-6'>{p.description}</p>

                        <div className='flex items-baseline gap-1 mb-2'>
                            <span className='text-4xl font-bold'>{p.price}</span>
                            {p.price !== "₹0" && <span className='text-xs text-zinc-400'>/one-time</span>}
                        </div>

                        <div className='flex items-center gap-1.5 text-xs text-indigo-400 mb-8'>
                            <Coins size={14} />
                            <span>{p.credits} Credits included</span>
                        </div>

                        <ul className='space-y-3 mb-8'>
                            {p.features.map((f) => (
                                <li
                                    key={f}
                                    className='flex items-center gap-2 text-sm text-zinc-300'
                                >
                                    <Check size={16} className='text-green-400' />
                                    {f}
                                </li>
                            ))}
                        </ul>


                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            disabled={loading !== null}
                            onClick={() => handleBuy(p.key)}
                            className={`w-full py-3 rounded-xl font-semibold transition
                              ${p.popular
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "bg-white/10 hover:bg-white/20"
                                } disabled:opacity-60 cursor-pointer`}
                        >
                            {loading === p.key ? (successMsg ? "Upgraded! ✓" : "Processing...") : p.button}
                        </motion.button>


                    </motion.div>
                ))}
            </div>


        </div>
    )
}

export default Pricing
