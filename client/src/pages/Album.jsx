import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import MusikCard from "../components/Card/MusicCard";
import Loader from "../components/Loader";
import { clearErrors, getAlbum } from "../redux/actions/album";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { SONG_DELETE_RESET } from "../redux/type/album";

const Album = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const { songsDelete, album, songs, pictureUrl, error, loading } = useSelector(
    (state) => state.album
  );

  useEffect(() => {
    dispatch(getAlbum(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (songsDelete) {
      alert.success("Song Deleted!");
      dispatch({ type: SONG_DELETE_RESET });
    }

    if (error) {
      useAlert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, songsDelete]);

  const handlePlay = (id) => {
    setCurrentPlaying(id);
  };

  const handlePause = () => {
    setCurrentPlaying(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header buttonName="Add Song" buttonLink={`/add-song/${id}`} />
      <br />
      <br />
      <div className="page_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-4">
                  <img
                    className="w-100 rounded-3"
                    src={pictureUrl + album.image}
                    alt={album.image}
                  />
                </div>
                <div className="col-8 text-white">
                  <h1>{album.name}</h1>
                  <p>{album.description}</p>
                  <div className="d-flex gap-3">
                    <Link
                      to={`/add-album/${album._id}`}
                      className="btn btn-warning"
                    >
                      <GrEdit fontSize={25} color="#fff" />
                    </Link>
                    <button
                      onClick={() => navigate(-1)}
                      className="btn btn-danger"
                    >
                      back
                    </button>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row playlist-content">
                    {(songs.length &&
                      songs.map((content) => {
                        return (
                          <MusikCard
                            {...content}
                            url={pictureUrl + content.audio}
                            albumId={id}
                            isPlaying={currentPlaying === content._id}
                            onPlay={() => handlePlay(content._id)}
                            onPause={handlePause}
                          />
                        );
                      })) || (
                      <div className="text-white text-center mt-5 opacity-50">
                        no songs available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Album;
