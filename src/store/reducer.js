let initialState = {
  count: 0,
  history: [],
  messages: [
    { id: 1, text: "Привет всем" },
    { id: 2, text: "Всем пока)" }
  ]
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

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: Math.random() * 10, text: action.value }
        ]
      };

    default:
      return newState;
  }
};

export default reducer;
