import { createStore } from "redux";
import weather from "./reducers/weather";

const store = createStore(weather);
export default store;