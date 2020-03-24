import { combineReducers } from "redux";
import { chatReducer } from "../store/chat-reducer";

let initialState = {
  count: 0,
  history: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.value,
        history: state.history.concat({
          id: Math.random(),
          count: state.count + action.value
        })
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.value,
        history: state.history.concat({
          id: Math.random(),
          count: state.count - action.value
        })
      };

    case "DELETE_ITEM":
      return {
        ...state,
        history: state.history.filter(item => item.id !== action.key)
      };

    default:
      return state;
  }
};

export default combineReducers({
  reducer,
  chatReducer
});
