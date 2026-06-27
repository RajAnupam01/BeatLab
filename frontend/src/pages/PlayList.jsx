import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SongData } from '../contexts/songContext';
import { assets } from '../assets/assets';
import { FaBookmark, FaPlay } from 'react-icons/fa';
import { AuthData } from '../contexts/authContext';

const PlayList = ({user}) => {
console.log("PlayList rendered");

 const {songs,setIsPlaying,setSelectedSong} = SongData();
 
 const [userPlaylist, setUserPlaylist] = useState([])

 useEffect(()=>{
  if(songs && user && Array.isArray(user.playlist) ){
    const filteredSongs = songs.filter((e)=>user.playlist.includes(e._id.toString()))
     setUserPlaylist(filteredSongs)
  }
 },[songs,user])


 const onClickHandler = (id) =>{
  setSelectedSong(id)
  setIsPlaying(true)
 }

 const {addToPlayList} = AuthData();

 const savePlaylist= (id) =>{
  addToPlayList(id)
 }

  return <Layout>
    <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
      {
        userPlaylist && userPlaylist[0] ? (
          <img src={userPlaylist[0].thumbnail} alt="" className="w-48 rounded" />
        ):(
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s" className="w-48 rounded" alt=""/>
        )
      }
      <div className="flex flex-col">
        <p>PlayList</p>
        <h2 className="text-3xl font-bold mb-4 md:text-5xl">{user.name} PlayList </h2>
        <h4>Your Favorite songs.</h4>
        <p className="mt-1">
          <img src={assets.spotify_logo} alt="" className="inline-block  " />
        </p>
      </div>
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
      <p>
        <b className="mr-4">#</b>
      </p>
      <p>Artist</p>
      <p className="hidden sm:block ">Description</p>
      <p className="text-center">Actions</p>
    </div>
    <hr />
    {userPlaylist && userPlaylist.map((e,i)=>(
      <div key={i} className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
        <p className="text-white">
          <b className="mr-4 text-[#a7a7a7] ">{i+1}</b>
          <img src={e.thumbnail} alt="" className="inline w-10 mr-5" />
          {e.title}
        </p>
          <p className="text-[15px]  ">{e.singer}</p>
          <p className="text-[15px] ">{e.description.slice(0,20)}...</p>
          <p className="flex justify-center items-center gap-5">
            <p className="text-[15px] text-center" onClick={()=>savePlaylist(e._id)} ><FaBookmark/></p>
            <p className="text-[15px] text-center"onClick={()=>onClickHandler(e._id)} ><FaPlay /></p>
          </p>
      </div>
    ))}
  </Layout>
}

export default PlayList