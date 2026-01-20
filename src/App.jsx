import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import { Desktop } from "./screens/Desktop";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        {/* <Route path="/events" element={<Events />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
