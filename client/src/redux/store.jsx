import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import {
  albumDetailReducer,
  albumReducer,
  createAlbumReducer,
} from "./reducer/album";
import { createSongReducer, songDetailReducer } from "./reducer/song";

const reducer = combineReducers({
  albums: albumReducer,
  album: albumDetailReducer,
  createAlbum: createAlbumReducer,
  songDetail: songDetailReducer,
  createSong: createSongReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
