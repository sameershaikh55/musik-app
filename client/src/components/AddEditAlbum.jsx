import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAlbum, createAlbum, clearErrors } from "../redux/actions/album";
import SmallLoader from "../components/SmallLoader";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_ALBUM_RESET } from "../redux/type/album";

const AddEditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.createAlbum);
  const { album, pictureUrl, ...rest } = useSelector((state) => state.album);

  const image = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const fields = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Description",
      type: "text",
      name: "description",
    },
  ];

  const [albumHandle, setAlbumHandle] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setAlbumHandle({
        ...albumHandle,
        image: e.target.files[0],
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setAlbumHandle({
        ...albumHandle,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", albumHandle.name);
    formData.append("description", albumHandle.description);
    formData.append("image", albumHandle.image);

    dispatch(createAlbum(formData, id));
  };

  useEffect(() => {
    if (id) {
      dispatch(getAlbum(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Album Created");
      setAlbumHandle({
        name: "",
        description: "",
        image: "",
      });
      image.current.value = null;
      dispatch({ type: CREATE_ALBUM_RESET });
      navigate("/");
    }

    if (id && album) {
      const { name, description, image } = album;

      setAlbumHandle({
        name,
        description,
        image,
      });

      setImagePreview(`${pictureUrl + image}`);
    }
  }, [dispatch, alert, error, album, success, pictureUrl]);

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
                      onClick={() => navigate("/")}
                      className="btn btn-danger"
                    >
                      back
                    </button>
                  </div>

                  <h2 className="text-center color2 text-white">
                    {" "}
                    {(id && "Edit") || "Add"} Album
                  </h2>
                  <form onSubmit={submit} className="form_container pt-3">
                    <div className="container-fluid">
                      <div className="row gy-4">
                        {fields.map((content, idx) => {
                          return (
                            <div key={idx} className="col-12">
                              <Input
                                label={content.label}
                                type={content.type}
                                name={content.name}
                                value={albumHandle[content.name]}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          );
                        })}

                        <div className="col-12">
                          <div className="row">
                            {albumHandle.image && (
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
                                (albumHandle.image && "col-10") || "col-12"
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

export default AddEditAlbum;
