import {
  ALL_ALBUM_FAIL,
  ALL_ALBUM_REQUEST,
  ALL_ALBUM_SUCCESS,
  ALBUM_DETAIL_FAIL,
  ALBUM_DETAIL_REQUEST,
  ALBUM_DETAIL_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ALBUM_REQUEST,
  CREATE_ALBUM_SUCCESS,
  CREATE_ALBUM_FAIL,
  CREATE_ALBUM_RESET,
  SONG_DELETE_FAIL,
  SONG_DELETE_SUCCESS,
  SONG_DELETE_RESET,
} from "../type/album";

// ALL album
export const albumReducer = (
  state = {
    albums: [],
  },
  action
) => {
  switch (action.type) {
    case ALL_ALBUM_REQUEST:
      return {
        loading: true,
      };
    case ALL_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        albums: action.payload.albums,
        pictureUrl: action.payload.pictureUrl,
      };
    case ALL_ALBUM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// album detail
export const albumDetailReducer = (
  state = {
    album: {},
    songs: [],
  },
  action
) => {
  switch (action.type) {
    case ALBUM_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ALBUM_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        album: action.payload.album,
        songs: action.payload.album.songs,
        pictureUrl: action.payload.pictureUrl,
      };
    case SONG_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        songs: state.songs.filter(({ _id }) => _id !== action.payload.song._id),
        songsDelete: true,
      };
    case ALBUM_DETAIL_FAIL:
    case SONG_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SONG_DELETE_RESET:
      return {
        ...state,
        songsDelete: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// CREATE Album
export const createAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ALBUM_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case CREATE_ALBUM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_ALBUM_RESET:
      return {
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
