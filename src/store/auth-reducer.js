let initialState = {
  id: 0,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
  photo: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORIZE":
      return {
        ...state,
        id: action.data.id,
        email: action.data.email,
        login: action.data.login,
        isAuth: action.auth,
      };
    case "LOGIN_PHOTO":
      return {
        ...state,
        photo: action.photo,
      };
    case "FETCHING_AUTH":
      return {
        ...state,
        isFetching: action.fetch,
      };
    default:
      return state;
  }
};
