import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function LoginModal({ open, onClose }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState("")

    const handleGoogleAuth = async () => {
        try {
            setLoading(true)
            setAuthError("")
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google`, {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            }, { withCredentials: true })

            if (data?.token) {
                localStorage.setItem("token", data.token)
            }
            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            console.error("Login error:", error)
            if (error.code === "auth/unauthorized-domain") {
                setAuthError(`Domain "${window.location.hostname}" is not authorized in Firebase Console > Authentication > Settings > Authorized Domains.`)
            } else if (error.code === "auth/popup-blocked") {
                setAuthError("Popup was blocked by your browser. Please enable popups for this site and try again.")
            } else if (error.code === "auth/popup-closed-by-user") {
                setAuthError("Sign-in popup was closed before completing.")
            } else if (error.code === "auth/operation-not-allowed") {
                setAuthError("Google sign-in is disabled in Firebase Console > Authentication > Sign-in method.")
            } else {
                setAuthError(error.response?.data?.message || error.message || "Failed to sign in. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open &&
                <motion.div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden' >
                            <motion.div
                                animate={{ opacity: [0.25, 0.4, 0.25] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
                            />
                            <motion.div
                                animate={{ opacity: [0.2, 0.35, 0.2] }}
                                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                                className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
                            />

                            <button
                                className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
                                onClick={onClose}
                            >
                                ✕
                            </button>

                            <div className='relative px-8 pt-14 pb-10 text-center'>
                                <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'> AI-powered website builder </h1>
                                <h2 className='text-3xl font-semibold leading-tight mb-3 space-x-2'>
                                    <span>Welcome to</span>
                                    <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>GenWeb.ai</span>
                                </h2>

                                {authError && (
                                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-left leading-relaxed">
                                        {authError}
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: loading ? 1 : 1.04 }}
                                    whileTap={{ scale: loading ? 1 : 0.96 }}
                                    onClick={handleGoogleAuth}
                                    disabled={loading}
                                    className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <div className='relative flex items-center justify-center gap-3'>
                                        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="" className='h-5 w-5' />
                                        {loading ? "Signing in..." : "Continue with Google"}
                                    </div>
                                </motion.button>

                                <div className='flex items-center gap-4 my-10'>
                                    <div className='h-px flex-1 bg-white/10' />
                                    <span className='text-xs text-zinc-500 tracking-wide'>Secure Login</span>
                                    <div className='h-px flex-1 bg-white/10' />
                                </div>

                                <p className='text-xs text-zinc-500 leading-relaxed'>
                                    By continuing, you agree to our{" "}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Terms of Service
                                    </span>{" "}
                                    and{" "}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Privacy Policy
                                    </span>.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default LoginModal
