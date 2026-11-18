import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token")
                const result = await axios.get(`${serverUrl}/api/user/me`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true
                })
                if (result.data) {
                    if (result.data.token) {
                        localStorage.setItem("token", result.data.token)
                    }
                    dispatch(setUserData(result.data))
                } else {
                    localStorage.removeItem("token")
                    dispatch(setUserData(null))
                }
            } catch (error) {
                console.error("Get current user error:", error)
                localStorage.removeItem("token")
                dispatch(setUserData(null))
            }
        }
        getCurrentUser()
    }, [dispatch])
}

export default useGetCurrentUser
