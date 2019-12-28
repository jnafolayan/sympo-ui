// action constants
export const SET_USER = 1 << 1;
export const DELETE_USER = 1 << 2;

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});