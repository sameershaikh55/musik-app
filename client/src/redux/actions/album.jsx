import {
  ALL_ALBUM_FAIL,
  ALL_ALBUM_REQUEST,
  ALL_ALBUM_SUCCESS,
  ALBUM_DETAIL_REQUEST,
  ALBUM_DETAIL_SUCCESS,
  ALBUM_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../type/album";
import axios from "axios";

// Get Albums
export const getAllAlbums = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ALBUM_REQUEST });
    const { data } = await axios.get(`api/album`);
    dispatch({
      type: ALL_ALBUM_SUCCESS,
      payload: data.albums,
    });
  } catch (error) {
    dispatch({
      type: ALL_ALBUM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Album
export const getAlbum = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALBUM_DETAIL_REQUEST });
    const { data } = await axios.get(`api/album/${id}`);

    dispatch({
      type: ALBUM_DETAIL_SUCCESS,
      payload: data.album,
    });
  } catch (error) {
    dispatch({
      type: ALBUM_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
