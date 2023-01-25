import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  createSong,
  getSong,
  clearErrors,
  addSongAudio,
} from "../redux/actions/song";
import SmallLoader from "../components/SmallLoader";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_SONG_RESET } from "../redux/type/song";

const AddEditSong = () => {
  const { albumId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success, ...create } = useSelector(
    (state) => state.createSong
  );
  const { song, pictureUrl, ...rest } = useSelector(
    (state) => state.songDetail
  );

  const image = useRef(null);
  const audio = useRef(null);
  const [imagePreview, setImagePreview] = useState("");

  const [songHandle, setSongHandle] = useState({
    name: "",
    audio: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setSongHandle({
        ...songHandle,
        image: e.target.files[0],
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "audio") {
      setSongHandle({
        ...songHandle,
        audio: e.target.files[0],
      });
    } else {
      setSongHandle({
        ...songHandle,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", songHandle.name);
    formData.append("image", songHandle.image);

    if (id) {
      dispatch(createSong(formData, id, false));
    } else {
      formData.append("album", albumId);
      dispatch(createSong(formData, albumId, true));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getSong(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Song Added!");

      if (id) {
        const formData = new FormData();
        formData.append("audio", songHandle.audio);
        dispatch(addSongAudio(formData, song._id));
      } else {
        const formData = new FormData();
        formData.append("audio", songHandle.audio);
        console.log(create.song._id);
        dispatch(addSongAudio(formData, create.song._id));
      }

      setSongHandle({
        name: "",
        audio: "",
        image: "",
      });
      image.current.value = null;
      audio.current.value = null;
      dispatch({ type: CREATE_SONG_RESET });
      navigate(-1);
    }

    if (id && song) {
      const { name, audio, image } = song;

      setSongHandle({
        name,
        audio,
        image,
      });

      setImagePreview(`${pictureUrl + image}`);
    }
  }, [dispatch, alert, error, song, success, pictureUrl]);

  if (id && rest.loading) {
    return <Loader />;
  }

  return (
    <div className="add_album_container">
      <div className="page_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6 mx-auto">
              <div className="register_container">
                <div className="inner_register_container">
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => navigate(-1)}
                      className="btn btn-danger"
                    >
                      back
                    </button>
                  </div>

                  <h2 className="text-center color2 text-white">
                    {(id && "Edit") || "Add"} Song
                  </h2>
                  <form onSubmit={submit} className="form_container pt-3">
                    <div className="container-fluid">
                      <div className="row gy-4">
                        <div className="col-12">
                          <Input
                            label="Name"
                            type="text"
                            name="name"
                            value={songHandle["name"]}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>

                        <div className="col-12">
                          <div className="row">
                            {songHandle.image && (
                              <div className="col-2">
                                <img
                                  className="w-100"
                                  src={imagePreview}
                                  alt="deviceImage"
                                />
                              </div>
                            )}
                            <div
                              className={`${
                                (songHandle.image && "col-10") || "col-12"
                              }`}
                            >
                              <input
                                ref={image}
                                type="file"
                                className="form-control"
                                id="customFile"
                                accept="image/*"
                                name="image"
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="bg-warning p-2 rounded-3">
                            <label className="mb-1 fw700">Upload Song</label>
                            <input
                              ref={audio}
                              type="file"
                              className="form-control"
                              id="customFile"
                              accept="audio/*"
                              name="audio"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            disabled={loading ? true : false}
                            type="submit"
                            className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-2 fw-bold"
                          >
                            {(loading && <SmallLoader />) || "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditSong;
