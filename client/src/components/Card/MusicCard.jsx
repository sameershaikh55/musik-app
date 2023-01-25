import React, { useEffect, useState } from "react";
import { deleteSong } from "../../redux/actions/song";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";

const MusicCard = ({
  url,
  name,
  isPlaying,
  onPlay,
  onPause,
  image,
  albumId,
  _id,
}) => {
  const dispatch = useDispatch();
  const { pictureUrl } = useSelector((state) => state.album);
  const [audio, setAudio] = useState(new Audio(url));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setAudio(new Audio(url));
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, [url]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(audio.currentTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration % 60);

  const cminutes = Math.floor(currentTime / 60);
  const cseconds = Math.round(currentTime % 60);

  const formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  const formattedCurrentTime = `${cminutes < 10 ? "0" + cminutes : cminutes}:${
    cseconds < 10 ? "0" + cseconds : cseconds
  }`;

  return (
    <div className="col-12">
      <div
        style={{ border: isPlaying && "2px solid #0d6efd" }}
        className="playlist-item rounded-3"
      >
        <img src={pictureUrl + image} alt={name} className="song-image" />
        <div className="song-details d-flex align-items-center gap-4">
          <h4 className="mb-0 text-white">{name}</h4>
        </div>
        <div className="song-controls gap-3">
          <div className="d-flex gap-3">
            <p className="mb-0 text-white opacity-50">
              {formattedDuration} / {formattedCurrentTime}
            </p>
            <p className="mb-0 text-white opacity-50">1 week ago</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <Link to={`/add-song/${albumId}/${_id}`}>
            <button className="btn btn-warning px-2">
              <GrEdit fontSize={25} color="#fff" />
            </button>
          </Link>
          <button
            onClick={() => dispatch(deleteSong(_id))}
            className="btn btn-danger px-1"
          >
            <MdDelete fontSize={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
