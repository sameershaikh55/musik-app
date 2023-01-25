import {
  SONG_DETAIL_REQUEST,
  SONG_DETAIL_SUCCESS,
  SONG_DETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_SONG_REQUEST,
  CREATE_SONG_SUCCESS,
  CREATE_SONG_FAIL,
  SONG_AUDIO_REQUEST,
  SONG_AUDIO_SUCCESS,
  SONG_AUDIO_FAIL,
} from "../type/song";

import { SONG_DELETE_SUCCESS, SONG_DELETE_FAIL } from "../type/album";
import axios from "axios";

// Get Song
export const getSong = (id) => async (dispatch) => {
  try {
    dispatch({ type: SONG_DETAIL_REQUEST });
    const { data } = await axios.get(`api/song/${id}`);

    dispatch({
      type: SONG_DETAIL_SUCCESS,
      payload: data.song,
    });
  } catch (error) {
    dispatch({
      type: SONG_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Song
export const createSong = (songData, id, songAdd) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SONG_REQUEST });

    let data;

    if (songAdd) {
      data = await axios.post(`api/song/${id}`, songData);
    } else {
      data = await axios.put(`api/song/${id}`, songData);
    }

    dispatch({
      type: CREATE_SONG_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SONG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add Audio
export const addSongAudio = (songData, id) => async (dispatch) => {
  try {
    dispatch({ type: SONG_AUDIO_REQUEST });

    let { data } = await axios.post(`api/song/audio/${id}`, songData);

    dispatch({
      type: SONG_AUDIO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_AUDIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add Audio
export const deleteSong = (id) => async (dispatch) => {
  try {
    let { data } = await axios.delete(`api/song/${id}`);
    dispatch({
      type: SONG_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
