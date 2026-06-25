import api from "../utils/axios";
import toast, { Toaster } from "react-hot-toast"
import { createContext, useContext, useEffect, useState } from "react";

const SongContext = createContext();


export const SongProvider = ({ children }) => {

    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [BtnLoading, setBtnLoading] = useState(false)
    const [songLoading, setSongLoading] = useState(true)


    async function fetchAllSongs() {
        try {
            const { data } = await api.get("/api/song/all")
            setSongs(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
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

    async function addSongThumbnail(id,formData,setThumbnail) {
        setBtnLoading(true)
        try {
            const { data } = await api.put("/api/song/"+id, formData)
            toast.success(data.message);
            setBtnLoading(false)
            fetchAllSongs()
            setThumbnail(null)
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    async function deleteSong(id){
        try {
            const {data} = await api.delete("/api/song/"+id)
            toast.success(data.message)
            fetchAllSongs()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    async function fetchAllAlbum() {
        try {
            const { data } = await api.get("/api/album/all")
            setAlbums(data.data)
        } catch (error) {
            toast.error(error.response.data.message)
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

    return <SongContext.Provider value={{ songs, addAlbum, BtnLoading, songLoading, albums, addSong,addSongThumbnail,deleteSong }} >{children}</SongContext.Provider>
}

export const SongData = () => useContext(SongContext)