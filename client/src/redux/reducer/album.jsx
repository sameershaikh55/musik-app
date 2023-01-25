import {
  ALL_ALBUM_FAIL,
  ALL_ALBUM_REQUEST,
  ALL_ALBUM_SUCCESS,
  ALBUM_DETAIL_FAIL,
  ALBUM_DETAIL_REQUEST,
  ALBUM_DETAIL_SUCCESS,
  CLEAR_ERRORS,
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
    case ALBUM_DETAIL_FAIL:
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
