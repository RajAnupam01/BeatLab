import api from "../utils/axios";
import {createContext, useContext, useEffect, useState} from "react"
import toast,{Toaster} from "react-hot-toast"

const AuthContext = createContext() // create the box

export const AuthProvider = ({children}) =>{  
    
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)


    async function registerUser(name,email,password,naviagate){
        setBtnLoading(true)
        try {
            const {data} = await api.post("/api/auth/register",{name,email,password})
            toast.success(data.message);
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            naviagate("/")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }

    }


    async function loginUser(email,password,navigate){
        setBtnLoading(true)
        try {
            const {data} = await api.post("/api/auth/login",{email,password})
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    async function fetchUser(){
        try {
            const {data} = await api.get("/api/user/me")
            setUser(data.user)
            setIsAuth(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setIsAuth(false)
        }
    }



    useEffect(()=>{
        fetchUser()
    },[])

return <AuthContext.Provider value={{registerUser,loginUser,user,isAuth,btnLoading,loading}} >{children}<Toaster/></AuthContext.Provider>// put data in the box
}

export const AuthData = () => useContext(AuthContext)  // read data from the box