let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: action.person
      };
    case "ADD_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.page
      };
    case "GET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalCount
      };
    default:
      return state;
  }
};
