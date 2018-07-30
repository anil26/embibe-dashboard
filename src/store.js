import { combineReducers } from 'redux';
import Login from "components/Login/reducer"
import Dashboard from "components/Dashboard/reducer"


const listReducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_ITEM':
      return [ ...state, { ...action.payload }];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

const store = combineReducers({
  list: listReducer,
  login: Login,
  dashboard: Dashboard,
});

export default store;