import axios from "axios"
import store from "../Store"
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_ADD_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "../constants/userConstants"

export const listUsers = () => async dispatch => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const { data } = await axios.get(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      error: error.message
    })
  }
}

export const addUser = (name, email, username = '-', city = '-', phone = '-', website = '-' ) => async dispatch => {
  try {
    dispatch({ type: USER_ADD_REQUEST })

    const { data } = store.getState().userList
    const newUser = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      name,
      email,
      username,
      address: {
        city
      },
      phone,
      website
    }
    data.push(newUser)

    dispatch({
      type: USER_ADD_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_FAIL,
      error: error.message
    })
  }
}

export const editUser = (id, name, email, username, phone, website, city) => async dispatch => {
  try {
    dispatch({ type: USER_EDIT_REQUEST })

    const { data } = store.getState().userList
    const user = data.find(user => user.id === id) 
    user.name = name
    user.email = email
    user.username = username
    user.phone = phone
    user.website = website
    user.address.city = city

    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      error: error.message
    })
  }
}

export const removeUser = id => async dispatch => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    const { data } = store.getState().userList
    const deletedUserIndex = data.findIndex(user => user.id === id)
    data.splice(deletedUserIndex, 1)

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      error: error.message
    })
  }
}

export const getUserDetails = id => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = store.getState().userList

    const user = data.find(user => user.id === id)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: user
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      error: error.message
    })
  }
}
