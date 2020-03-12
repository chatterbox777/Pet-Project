import { createStore } from "redux";

const initialState = {
  count: 0
};

const myReducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "INCREMENT") {
    newState.count += 1;
  }
  if (action.type === "DECREMENT") {
    newState.count -= 1;
  }
  return newState;
};

const store = createStore();

store.dispatch({ type: "INCREMENT" });

console.log(store);
