import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Header from "../components/Header";
import AlbumCard from "../components/Card/AlbumCard";
import { getAllAlbums, clearErrors } from "../redux/actions/album";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { albums, error, loading } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(getAllAlbums());
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header buttonName="Add Album" buttonLink="/add-album" />

      <div className="page_container mt-4">
        <div className="container-fluid">
          <div className="row">
            {albums.map((content) => {
              return <AlbumCard key={content.name} {...content} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
