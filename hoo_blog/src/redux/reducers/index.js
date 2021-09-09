import { UPDATEUSERNUM, UPDATECONFIRMLOGIN } from "../actions";
import { combineReducers } from "redux";

const usernum = (state = {}, action) => {
  switch (action.type) {
    case UPDATEUSERNUM:
      return { /*...state, */usernum: action.payload };
    default:
      return state;
  }
};

const confirmLogin = (state = {}, action) => {
  switch (action.type) {
    case UPDATECONFIRMLOGIN:
      return { /*...state, */confirmLogin: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ usernum, confirmLogin });

export default rootReducer;