import {
  SONG_DETAIL_REQUEST,
  SONG_DETAIL_SUCCESS,
  SONG_DETAIL_FAIL,
  CLEAR_ERRORS,
  CREATE_SONG_REQUEST,
  CREATE_SONG_SUCCESS,
  CREATE_SONG_FAIL,
  CREATE_SONG_RESET,
} from "../type/song";

// song detail
export const songDetailReducer = (
  state = {
    song: {},
  },
  action
) => {
  switch (action.type) {
    case SONG_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case SONG_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        song: action.payload.song,
        pictureUrl: action.payload.pictureUrl,
      };
    case SONG_DETAIL_FAIL:
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

// CREATE song
export const createSongReducer = (
  state = {
    song: {},
  },
  action
) => {
  switch (action.type) {
    case CREATE_SONG_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        song: action.payload.song,
        success: action.payload.success,
      };
    case CREATE_SONG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SONG_RESET:
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
