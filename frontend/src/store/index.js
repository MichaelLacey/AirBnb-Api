import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import allSpotsReducer from "./allSpots";
<<<<<<< HEAD

// add reducer functions here
=======
>>>>>>> dev
const rootReducer = combineReducers({
  session: sessionReducer,
<<<<<<< HEAD
  // get all the spots
  spots: allSpotsReducer,

=======
  spots: allSpotsReducer,
>>>>>>> dev
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
