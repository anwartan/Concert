export const initialState = {
  user: null,
  loading: true,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
