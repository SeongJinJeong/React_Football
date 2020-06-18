import { combineReducers } from "redux";
import Search from "./search";
import LoginStatus from "./CheckLogin";

export default combineReducers({
  Search,
  LoginStatus,
});
