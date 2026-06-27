import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import { SongData } from '../contexts/songContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AuthData } from '../contexts/authContext';
import { FaBookmark, FaPlay } from 'react-icons/fa';
import Loading from '../components/Loading';

const Album = () => {

  const { fetchSongsByAlbum, albumSong, albumData,setSelectedSong,setIsPlaying,songByAlbumLoading } = SongData()

  const params = useParams()
  useEffect(() => {
    fetchSongsByAlbum(params.id)
  }, [params.id])

  const onClickHandler = (id) =>{
  setSelectedSong(id)
  setIsPlaying(true)
 }

 const {addToPlayList} = AuthData();

 const savePlaylist= (id) =>{
  addToPlayList(id)
 }

 if (songByAlbumLoading) {
  return (
    <Layout>
      <Loading/>
    </Layout>
  );
}

  return <Layout>
    {albumData && (
      <>
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
          {albumData.thumbnail && (
            <img src={albumData.thumbnail} alt="" className="w-48 rounded" />

          )}
          <div className="flex flex-col">
            <p>PlayList</p>
            <h2 className="text-3xl font-bold mb-4 md:text-5xl">{albumData.title}</h2>
            <h4>{albumData.description}</h4>
            <p className="mt-1">
              <img src={assets.spotify_logo} alt="" className="inline-block w-6  " />
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
        {albumSong && albumSong.map((e,i)=>(
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
      </>
    )}
  </Layout>
}

export default Album