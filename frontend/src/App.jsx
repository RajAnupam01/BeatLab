import React from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthData } from "./contexts/authContext";
import Loading from "./components/Loading";

const App = () => {
  const { loading, user, isAuth } = AuthData()
  return (
    <>
      {loading ? (<Loading />) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}
export default App;