const initialState = {
  count: 0,
  history: []
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

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
      break;
    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.value,
        history: state.history.concat({
          id: Math.random(),
          count: state.count - action.value
        })
      };
      break;
    case "DELETE_ITEM":
      return {
        ...state,
        history: state.history.filter(item => item.id !== action.key)
      };
      break;
  }
  return newState;
};

export default reducer;
