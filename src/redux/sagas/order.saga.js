import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getAdminOrders(){
    try{
        const adminOrdersResponse = yield axios.get('/api/orders')
        yield put ({type: 'SET_ORDERS', payload: adminOrdersResponse.data})
    } catch (error) {
        console.log('Error retrieving order data')
    };
};

function* getClientOrders(action){
    try{
        const clientId = action.payload
        const clientOrdersResponse = yield axios.get(`/api/orders/${clientId}`);
        yield put ({type: 'SET_CLIENT_ORDERS', payload: clientOrdersResponse.data});
    } catch (error) {
        console.log('Error fetching client order data')
    };
};

function* postOrder(action){
    try{
        const orderInfo = action.payload;
        const postOrderResponse = yield axios.post('/api/orders', orderInfo);
    } catch (error) {
        console.log('Failed to submit order')
    };
};

function* getOrderCount(action){
    try{
        const date = action.payload
        const countResponse = yield axios.post(`/api/inventory`, date)
        //console.log('CountResponse: ', countResponse);
        yield put({type: 'SET_ORDER_COUNT', payload: countResponse.data})
    } catch (error) {
        console.log('Error getting order count')
    };
}

function* orderSaga() {
    yield takeEvery('GET_ADMIN_ORDERS', getAdminOrders);
    yield takeEvery('GET_CLIENT_ORDERS', getClientOrders);
    yield takeEvery('POST_ORDER', postOrder);
    yield takeEvery('GET_ORDER_COUNT', getOrderCount);
};

export default orderSaga;