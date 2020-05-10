let initialState = {
  id: 0,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
  photo: "",
  incorrect: null,
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
    case "INCORRECT_PASS_OR_EMAIL":
      return {
        ...state,
        incorrect: action.incorrect,
      };
    default:
      return state;
  }
};
