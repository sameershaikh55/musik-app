import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AlbumCard = ({ _id, image, name, description }) => {
  const { pictureUrl } = useSelector((state) => state.albums);

  return (
    <Link
      to={`/album/${_id}`}
      className="card-container col-lg-3 col-md-4 col-sm-6 mb-4 text-decoration-none"
    >
      <div className="card h-100">
        <img src={pictureUrl + image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title text-white fw700">{name}</h5>
          <p className="card-text text-white opacity-75 f14">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
