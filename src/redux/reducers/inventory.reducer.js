import { combineReducers } from 'redux';

const inventoryList = (state = [], action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return action.payload;
    default:
      return state;
  }
};

const imageList = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return action.payload;
    case 'FETCH_IMAGES_FAILED':
      console.error('Failed to fetch images:', action.error);
    // return state; // In case of error, return existing state
    default:
      return state;
  }
};

export default combineReducers({
  inventoryList,
  imageList,
});
