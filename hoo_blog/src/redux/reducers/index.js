import { UPDATEUSERNUM } from "../actions";
import { combineReducers } from "redux";

const initState = {
  usernum: 0,
};

const usernum = (state = initState, action) => {
  switch (action.type) {
    case UPDATEUSERNUM:
      return { ...state, usernum: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ usernum });

export default rootReducer;