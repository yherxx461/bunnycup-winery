import { combineReducers } from "redux";

const cart = (state = [], action) => {
    switch (action.type){
        case 'ADD_TO_CART':
            return [...state, action.payload];
        default:
            return state;
    };
};

const orders = (state = [], action) => {
    switch (action.type){
        case 'SET_ORDERS':
            return action.payload;
        default:
            return state;
    };
};

const clientOrders = (state = [], action) => {
    switch (action.type){
        case 'SET_CLIENT_ORDERS':
            return action.payload;
        default:
            return state;
    };
}

export default combineReducers({
    cart, //This is the storage for our cart
    orders, //This is intended to hold order data for an admin
    clientOrders, //This will hold all of the orders for a logged in client
})