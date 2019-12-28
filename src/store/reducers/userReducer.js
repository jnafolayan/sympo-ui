import axios from "axios";
import { SET_USER, DELETE_USER } from "../actions/userActions";

const initialState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  token: localStorage.getItem("token")
};

if (initialState.token)
  axios.defaults.headers.common["Authorization"] = `Bearer ${initialState.token}`;

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
      if (payload.remember) {
        // store if user wants to be remembered
        localStorage.setItem("username", payload.username);
        localStorage.setItem("email", payload.email);
        localStorage.setItem("token", payload.token);
      }
      delete payload.remember;
      return { ...payload };
    case DELETE_USER:
      localStorage.clear();
      return { ...initialState };
    default:
      return state;
  }
}