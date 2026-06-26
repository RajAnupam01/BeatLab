import React, { useState } from 'react'
import { AuthData } from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { SongData } from '../contexts/songContext';
import { MdDelete } from "react-icons/md"

function Admin() {

  const { user } = AuthData();
  const { albums, songs, addAlbum, BtnLoading, addSong, addSongThumbnail, deleteSong } = SongData()

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [audio, setAudio] = useState(null)
  const [singer, setSinger] = useState("")
  const [album, setAlbum] = useState("")

  const fileChangeHandler = e => {
    const thumbnail = e.target.files[0]
    setThumbnail(thumbnail)
  }

  const fileHandler = e => {
    const audio = e.target.files[0]
    setAudio(audio)
  }

  const createAlbum = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("thumbnail", thumbnail)
    addAlbum(formData, setTitle, setDescription, setThumbnail)

  }

  const createSong = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("album", album)
    formData.append("singer", singer)
    formData.append("audio", audio)
    addSong(formData, setTitle, setThumbnail, setDescription, setSinger, setAlbum, setAudio)
  }

  const createSongThumbnail = (id) => {
    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    addSongThumbnail(id, formData, setThumbnail)
  }


  const deleteSongHandler = (id) => {
    if (confirm("are you sure you want to delete this song."))
      deleteSong(id)
  }

  if (user && user.role !== "admin") return navigate("/")

  return (
   <div className="min-h-screen bg-gradient-to-br from-black via-[#121212] to-[#1b1b1b] text-white p-6 md:p-10">

  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
    <div>
      <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
         Admin Section
      </h1>
      <p className="text-gray-400 mt-2">
        Manage albums, songs and artwork
      </p>
    </div>

    <Link
      to="/"
      className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl font-semibold"
    >
      Home
    </Link>
  </div>

  {/* Stats */}
  <div className="grid md:grid-cols-2 gap-5 mb-10">
    <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6">
      <p className="text-gray-400">Songs</p>
      <h2 className="text-4xl font-bold text-green-500">
        {songs?.length || 0}
      </h2>
    </div>

    <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6">
      <p className="text-gray-400">Albums</p>
      <h2 className="text-4xl font-bold text-green-500">
        {albums?.length || 0}
      </h2>
    </div>
  </div>

  {/* Forms */}
  <div className="grid lg:grid-cols-2 gap-8">

    {/* Album Form */}
    <div className="bg-[#181818] border border-gray-800 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Create Album
      </h2>

      <form onSubmit={createAlbum}>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Album Title
          </label>

          <input
            type="text"
            placeholder="Enter album title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Description
          </label>

          <input
            type="text"
            placeholder="Album description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Cover Art
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={fileChangeHandler}
            className="w-full text-sm text-gray-300"
          />
        </div>

        <button
          disabled={BtnLoading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {BtnLoading ? "Please Wait..." : "Create Album"}
        </button>
      </form>
    </div>

    {/* Song Form */}
    <div className="bg-[#181818] border border-gray-800 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Upload Song
      </h2>

      <form onSubmit={createSong}>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Song Title
          </label>

          <input
            type="text"
            placeholder="Song title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Description
          </label>

          <input
            type="text"
            placeholder="Song description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-300">
            Singer
          </label>

          <input
            type="text"
            placeholder="Singer name"
            required
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
            className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="w-full bg-[#242424] border border-gray-700 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-green-500"
        >
          <option value="">Choose Album</option>

          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>

        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Audio File
          </label>

          <input
            type="file"
            accept="video/*"
            required
            onChange={fileHandler}
            className="w-full text-sm text-gray-300"
          />
        </div>

        <button
          disabled={BtnLoading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {BtnLoading ? "Uploading..." : "Upload Song"}
        </button>
      </form>
    </div>
  </div>

  {/* Song Library */}
  <div className="mt-14">
    <h2 className="text-3xl font-bold mb-6">
      Song Library
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {songs &&
        songs.map((e, i) => (
          <div
            key={i}
            className="relative bg-[#181818] border border-gray-800 rounded-3xl overflow-hidden hover:border-green-500 hover:-translate-y-2 transition-all duration-300"
          >

            {e.thumbnail ? (
              <img
                src={e.thumbnail}
                alt={e.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="p-5 flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  className="text-sm"
                />

                <button
                  onClick={() => createSongThumbnail(e._id)}
                  className="bg-green-500 hover:bg-green-600 py-2 rounded-xl"
                >
                  Upload Artwork
                </button>
              </div>
            )}

            <div className="p-5">
              <h3 className="font-bold text-lg truncate">
                {e.title}
              </h3>

              <p className="text-green-400 mt-1">
                {e.singer}
              </p>

              <p className="text-gray-400 text-sm mt-3">
                {e.description}
              </p>
            </div>

            <button
              onClick={() => deleteSongHandler(e._id)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg transition"
            >
              <MdDelete size={18} />
            </button>
          </div>
        ))}
    </div>
  </div>
</div>
  )
}

export default Admin