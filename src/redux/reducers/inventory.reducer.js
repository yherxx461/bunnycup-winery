import { combineReducers } from 'redux';

const inventoryList = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVENTORY':
        return action.payload;
      default:
        return state;
    }
}

export default combineReducers({
    inventoryList,
  });