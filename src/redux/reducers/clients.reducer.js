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