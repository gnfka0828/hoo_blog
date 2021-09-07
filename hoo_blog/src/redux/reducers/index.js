import { UPDATEUSERNUM, UPDATECONFIRMLOGIN } from "../actions";
import { combineReducers } from "redux";

const usernum = (state = {usernum : 0}, action) => {
  switch (action.type) {
    case UPDATEUSERNUM:
      return { /*...state, */usernum: action.payload };
    default:
      return state;
  }
};

const confirmLogin = (state = {confirmLogin : false}, action) => {
  switch (action.type) {
    case UPDATECONFIRMLOGIN:
      return { /*...state, */confirmLogin: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ usernum, confirmLogin });

export default rootReducer;