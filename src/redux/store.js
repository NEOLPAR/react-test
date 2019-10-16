import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

export default createStore(rootReducer, applyMiddleware(promise));
