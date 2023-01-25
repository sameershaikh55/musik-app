import React from "react";
import { Link } from "react-router-dom";

const Header = ({ buttonName, buttonLink }) => {
  return (
    <header className="header_container">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="text-white">
          <Link to="/" className="text-decoration-none text-white">
            <h2>
              <span className="text-primary fw800">Music</span>
              App
            </h2>
          </Link>
        </div>
        <Link to={buttonLink} className="btn btn-primary add-album-btn">
          {buttonName}
        </Link>
      </div>
    </header>
  );
};

export default Header;
