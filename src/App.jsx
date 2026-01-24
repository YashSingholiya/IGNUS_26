import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import Passes from "./pages/Passes/Passes";
// import { Desktop } from "./screens/Desktop";
import React from "react";
import SEO from "./SEO";
import Login from "./pages/Login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <SEO />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Desktop />} /> */}
          <Route path="/landing" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passes" element={<Passes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
