import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import Album from "./pages/Album";
import AddEditAlbum from "./components/AddEditAlbum";
import AddEditSong from "./components/AddEditSong";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<Album />} />

        {["/add-album", "/add-album/:id"].map((path, index) => (
          <Route key={index} path={path} element={<AddEditAlbum />} />
        ))}

        {["/add-song/:albumId", "/add-song/:albumId/:id"].map((path, index) => (
          <Route key={index} path={path} element={<AddEditSong />} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
