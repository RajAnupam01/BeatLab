import React from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthData } from "./contexts/authContext";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList"
import Album from "./pages/Album";

const App = () => {
  const {user, loading, isAuth } = AuthData()
  return (
    <>
      {loading ? (<Loading />) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path ="/admin" element={isAuth ? <Admin/>: <Login/>}/>
            <Route path="/playlist" element={isAuth ? <PlayList user={user} />:<Login/>}/>
            <Route path="/album/:id" element={isAuth ? <Album/>:<Login/>}/>
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />

          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}
export default App;