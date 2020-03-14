const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "INCREMENT") {
    newState.count++;
  }
  if (action.type === "DECREMENT") {
    newState.count--;
  }
  return newState;
};

export default reducer;
