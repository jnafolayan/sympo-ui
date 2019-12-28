export const STORE_POLLS = 1 << 1;
export const SET_POLL_FOCUS = 1 << 2;

export const storePolls = (polls) => ({
  type: STORE_POLLS,
  payload: polls
});

export const setPollFocus = (poll) => ({
  type: SET_POLL_FOCUS,
  payload: poll
});
