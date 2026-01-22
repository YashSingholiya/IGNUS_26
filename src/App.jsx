import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import { Desktop } from "./screens/Desktop";
import React from "react";
import SEO from "./SEO";

function App() {
  return (
    <>
      <SEO />    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desktop />} />
          {/* <Route path="/landing" element={<Home />} />
          <Route path="/events" element={<Events />}  />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
