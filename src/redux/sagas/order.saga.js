import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminOrders(){
    try{
        const adminOrdersResponse = yield axios.get('/api/orders')
        yield put ({type: 'SET_ORDERS', payload: adminOrdersResponse.data})
    } catch (error) {
        console.log('Error retrieving order data')
    }   
};

function* getClientOrders(action){
    try{
        const clientId = action.payload
        const clientOrdersResponse = yield axios.get(`/api/orders/${clientId}`);
        yield 
    } catch (error) {
        console.log('Error fetching client order data')
    }
}

function* orderSaga() {
    yield takeEvery('GET_ADMIN_ORDERS', getAdminOrders);
    yield takeEvery('GET_CLIENT_ORDERS', getClientOrders);
};

export default orderSaga;