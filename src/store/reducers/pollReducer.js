import { STORE_POLLS, SET_POLL_FOCUS  } from "../actions/pollActions";

const initialState = {
  pollFocus: null,
  allPolls: []
};

export default function pollReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case STORE_POLLS:
      return { ...state, allPolls: payload };
    case SET_POLL_FOCUS:
      return { ...state, pollFocus: payload };
    default:
      return state;
  }
}