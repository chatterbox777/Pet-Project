let initialState = {
  id: 0,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
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

    default:
      return state;
  }
};
