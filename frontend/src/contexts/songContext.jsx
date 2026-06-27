import api from "../utils/axios";
import toast from "react-hot-toast"
import { createContext, useContext, useEffect, useState } from "react";


const SongContext = createContext();


export const SongProvider = ({ children }) => {

    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [BtnLoading, setBtnLoading] = useState(false)
    const [songsLoading, setSongsLoading] = useState(true);
    const [albumsLoading, setAlbumsLoading] = useState(true);
    const [songByAlbumLoading, setSongByAlbumLoading] = useState(true)
    const [currentSongLoading, setCurrentSongLoading] = useState(false);
    const [selectSong, setSelectedSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [song, setSong] = useState(null)

    const appLoading = songsLoading || albumsLoading;

    async function fetchAllSongs() {
        setSongsLoading(true)
        try {
            const { data } = await api.get("/api/song/all")
            setSongs(data.data)
            setSelectedSong(data.data[0]._id)
            setIsPlaying(false)
            setSongsLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setSongsLoading(false)
        }
    }

    async function fetchSingleSong() {
        setCurrentSongLoading(true)
        try {
            const { data } = await api.get("/api/song/single/" + selectSong)
            setSong(data.data)
            setCurrentSongLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setCurrentSongLoading(false)
        }
    }


    async function addSong(formData, setTitle, setDescription, setAlbum, setAudio) {
        setBtnLoading(true)
        try {
            const { data } = await api.post("/api/song/new", formData)
            toast.success(data.message);
            setBtnLoading(false)
            fetchAllSongs()
            setTitle("")
            setDescription("")
            setAlbum("")
            setAudio(null)
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    async function addSongThumbnail(id, formData, setThumbnail) {
        setBtnLoading(true)
        try {
            const { data } = await api.put("/api/song/" + id, formData)
            toast.success(data.message);
            setBtnLoading(false)
            fetchAllSongs()
            setThumbnail(null)
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    async function deleteSong(id) {
        try {
            const { data } = await api.delete("/api/song/" + id)
            toast.success(data.message)
            fetchAllSongs()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    async function fetchAllAlbum() {
        setAlbumsLoading(true)
        try {
            const { data } = await api.get("/api/album/all")
            setAlbums(data.data)
            setAlbumsLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setAlbumsLoading(false)
        }
    }

    async function addAlbum(formData, setTitle, setDescription, setThumbnail) {
        setBtnLoading(true)
        try {
            const { data } = await api.post("/api/album/new", formData)
            toast.success(data.message);
            setBtnLoading(false)
            fetchAllAlbum()
            setTitle("")
            setDescription("")
            setThumbnail(null)
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }


    useEffect(() => {
        fetchAllSongs()
        fetchAllAlbum()

    }, [])


    const [index, setIndex] = useState(0)

    function nextMusic() {
        if (index === songs.length - 1) {
            return null
        } else {
            setIndex(index + 1)
            setSelectedSong(songs[index + 1]._id)
        }
    }

    function prevMusic() {
        if (index === 0) {
            return null
        } else {
            setIndex(index - 1)
            setSelectedSong(songs[index - 1]._id)
        }
    }

    const [albumSong, setAlbumSong] = useState([])
    const [albumData, setAlbumData] = useState([])
    async function fetchSongsByAlbum(id) {
        setSongByAlbumLoading(true)
        try {
            const { data } = await api.get("/api/song/album/" + id);
            setAlbumData(data.data.album);
            setAlbumSong(data.data.songs);
            setSongByAlbumLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setSongByAlbumLoading(false)
        }
    }

    return <SongContext.Provider value={{ songs, addAlbum, BtnLoading, songsLoading, appLoading, albumsLoading, albums, addSong, addSongThumbnail, deleteSong, fetchSingleSong, song, setSelectedSong, currentSongLoading, isPlaying, setIsPlaying, selectSong, nextMusic, prevMusic, fetchSongsByAlbum, albumSong, albumData,songByAlbumLoading }} >{children}</SongContext.Provider>
}

export const SongData = () => useContext(SongContext)