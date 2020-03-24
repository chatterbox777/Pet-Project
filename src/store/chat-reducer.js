import { createAction } from "redux-actions";
import * as constants from "./constants";

export const actions = {
  addMessage: createAction(constants.ADD_MESSAGE)
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
        messages: [...state.messages, action.payload]
      };

    default:
      return state;
  }
};
