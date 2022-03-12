import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userEditReducer, userDetailsReducer, userListReducer } from "./reducers/userReducers"

const reducer = combineReducers({
  userList: userListReducer,
  newUserList: userEditReducer,
  userDetails: userDetailsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store