import { combineReducers, createStore, applyMiddleware } from "redux";
import { usersReducer } from "./users-reducer";
import { profileReducer } from "./profile-reducer";
import { chatReducer } from "./chat-reducer";
import { authReducer } from "./auth-reducer";
import { mainReducer } from "./reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
  users: usersReducer,
  profile: profileReducer,
  chat: chatReducer,
  auth: authReducer,
  counter: mainReducer,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
