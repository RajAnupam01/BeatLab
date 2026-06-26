import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

import { AuthData } from '../contexts/authContext';
import MyPlayList from './MyPlayList';


const SideBar = () => {

    const { user } = AuthData()
    const navigate = useNavigate()


    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg lg:flex" >
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around " onClick={() => navigate("/")} >
                <div className="flex items-center gap-3 pl-8 cursor-pointer" >
                    <img src={assets.home_icon} className="w-6" />
                    <p className="font-bold" >Home</p>
                </div>
                <div className="flex items-center gap-3 pl-8 cursor-pointer" onClick={() => navigate("/")} >
                    <img src={assets.search_icon} className="w-6" />
                    <p className="font-bold" >Search</p>
                </div>
            </div>
            <div className="bg-[#121212] h-[85%] rounded " >
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={assets.stack_icon} className="w-8" />
                        <p className="font-semibold" >Your Library</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={assets.arrow_icon} className="w-8" />
                        <img src={assets.plus_icon} className="w-8" />
                    </div>
                </div>

                <div onClick={() => navigate("/playlist")} >
                    <MyPlayList/>
                </div>

                <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 " >
                    <h1>Let's findSome podcast to follow</h1>
                    <p>We'll keep you update on new episodes</p>
                    <button className="px-4 py-2 bg-white text-black text-[15px] rounded-full mt-4">Browse Podcasts</button>
                </div>
                {user && user.role === "admin" && (
                    <button className="px-4 py-2 bg-white text-black text-[15px] rounded-full mt-4" onClick={() => navigate("/admin")} >Admin DashBoard</button>)
                }

            </div>
        </div>
    )
}

export default SideBar