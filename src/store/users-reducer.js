let initialState = {
  users: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: state.users.concat(action.person)
      };
    default:
      return state;
  }
};
