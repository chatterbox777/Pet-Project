import { combineReducers } from "redux";
import { chatReducer } from "../store/chat-reducer";
import { usersReducer } from "./users-reducer";
import { profileReducer } from "./profile-reducer";
import { authReducer } from "./auth-reducer";
import { basketReducer } from "./basket-reducer";
import { reducer as formReducer } from "redux-form";

let initialState = {
  count: 0,
  history: [],
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.value,
        history: state.history.concat({
          id: Math.random(),
          count: state.count + action.value,
        }),
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.value,
        history: state.history.concat({
          id: Math.random(),
          count: state.count - action.value,
        }),
      };

    case "DELETE_ITEM":
      return {
        ...state,
        history: state.history.filter((item) => item.id !== action.key),
      };
    case "DELETE_HISTORY":
      return {
        ...state,
        history: state.history.splice(0, 0),
      };

    default:
      return state;
  }
};

export default combineReducers({
  mainReducer,
  chatReducer,
  usersReducer,
  profileReducer,
  authReducer,
  form: formReducer,
  basketReducer,
});
