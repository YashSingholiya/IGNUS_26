import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import Passes from "./pages/Passes/Passes";
import Login from "./pages/Login/Login";
import Prakrit from "./pages/Prakriti/Prakrit";
// import { Desktop }  from "./screens/Desktop/Desktop";
import Igmun from "./pages/igmun/igmun";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import OAuthCallback from "./pages/OAuthCallback";
import CA from "./pages/CA/CA";
import SEO from "./SEO";

function App() {
  return (
    <>
      <SEO />
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* <Route path="/" element={<Desktop />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/passes" element={<Passes />} />
          <Route path="/prakriti" element={<Prakrit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ca" element={<CA />} />
          <Route path="/igmun" element={<Igmun />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/oauth/callback" element={<OAuthCallback />} /> */}
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
      </BrowserRouter>
    </>
  );
}

export default App;
