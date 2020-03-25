import { createAction } from "redux-actions";
import * as constants from "./constants";

export const actions = {
  addMessage: createAction(constants.ADD_MESSAGE),
  deleteMessage: createAction(constants.DELETE_MESSAGE)
};

let initialState = {
  messages: [
    { id: 1, text: "Привет всем" },
    { id: 2, text: "Всем пока)" }
  ]
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      console.log(action);
      return {
        ...state,
        messages: state.messages.concat(action.value)
      };
    case "DELETE_MESSAGE":
      console.log(action);
      return {
        ...state,
        messages: state.messages.filter(item => item.id !== action.key)
      };
    default:
      return state;
  }
};
