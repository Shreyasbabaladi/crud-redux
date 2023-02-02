/* eslint-disable import/no-anonymous-default-export */

import { ADD_EVENT, REMOVE_EVENT,UPDATE_EVENT } from "../action/actions-types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.payload];
    case REMOVE_EVENT:
      return state.filter((eventIteam) => eventIteam.id !== action.payload);
    case UPDATE_EVENT:
      let arr = state.map((eventIteam) => eventIteam.id === action.payload.id? action.payload : eventIteam);
      console.log('reducer:-' + arr);
      return arr;
    default:
      return state;
  }
};
