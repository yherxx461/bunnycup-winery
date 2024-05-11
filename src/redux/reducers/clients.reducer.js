import { combineReducers } from 'redux';

export const clients = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENTS':
      return action.payload;
    default:
      return state;
  }
};

export const clientDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CLIENT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  clients, //This is the storage for clients
  clientDetails, //This is the storage for the client's addresses, etc.
});
