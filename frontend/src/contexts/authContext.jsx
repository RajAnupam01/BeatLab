import api from "../utils/axios";
import { createContext, useContext, useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const AuthContext = createContext() // create the box

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)


    async function registerUser(name, email, password, naviagate) {
        setBtnLoading(true)
        try {
            const { data } = await api.post("/api/auth/register", { name, email, password })
            toast.success(data.message);
            await fetchUser()
            setBtnLoading(false)
            naviagate("/")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }

    }


    async function loginUser(email, password, navigate) {
        setBtnLoading(true)
        try {
            const { data } = await api.post("/api/auth/login", { email, password })
            toast.success(data.message);
            await fetchUser()
            setBtnLoading(false)
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    async function logout() {
        try {
            const data = await api.post("/api/auth/logout")
            setUser(null)
            setIsAuth(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    async function addToPlayList(id) {
        try {
            const { data } = await api.post("/api/user/song/" + id)
            toast.success(data.message);
            fetchUser();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    async function fetchUser() {
        try {
            const { data } = await api.get("/api/user/me")
            setUser(data.data)
            setIsAuth(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setIsAuth(false)
        }
    }


    useEffect(() => {
        fetchUser()
    }, [])

    return <AuthContext.Provider value={{ registerUser, loginUser, user, isAuth, btnLoading, loading, logout, addToPlayList }} >{children}<Toaster /></AuthContext.Provider>// put data in the box
}

export const AuthData = () => useContext(AuthContext)  // read data from the box