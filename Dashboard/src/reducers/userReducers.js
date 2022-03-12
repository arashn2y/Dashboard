import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,USER_ADD_REQUEST, USER_ADD_SUCCESS,USER_ADD_FAIL,USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL
} from "../constants/userConstants"

export const userListReducer = (state = { data: [], ready: false}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, data: [] }
    case USER_LIST_SUCCESS:
      return { loading: false, data: action.payload, ready: true }
    case USER_LIST_FAIL:
      return { loading: false, data: action.error }
    default:
      return state
  }
}

export const userEditReducer = (state = { newList: [] }, action) => {
  switch (action.type) {
    case USER_ADD_REQUEST:
      return { loading: true, newList: [] }
    case USER_ADD_SUCCESS:
      return { loading: false, newList: action.payload }
    case USER_ADD_FAIL:
      return { loading: false, error: action.error }
    case USER_EDIT_REQUEST:
      return { loading: true, newList: [] }
    case USER_EDIT_SUCCESS:
      return { loading: false, newList: action.payload }
    case USER_EDIT_FAIL:
      return { loading: false, error: action.error }
      case USER_DELETE_REQUEST:
      return { loading: true, newList: [] }
    case USER_DELETE_SUCCESS:
      return { loading: false, newList: action.payload }
    case USER_DELETE_FAIL:
      return { loading: false, newList: action.error }
      case USER_DETAILS_REQUEST:
      return { loading: true, newList: [] }
    case USER_DETAILS_SUCCESS:
      return { loading: false, newList: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, newList: action.error }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
      case USER_DETAILS_REQUEST:
      return { loading: true, user: {} }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, user: action.error }
    default:
      return state
  }
}

