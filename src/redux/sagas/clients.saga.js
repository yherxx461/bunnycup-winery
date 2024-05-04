import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

export function* fetchAllClients() {
    try {
      // Get the clients:
      const clientResponse = yield axios.get('/api/clients');
      // Set the value of the client reducer:
      yield put({
        type: 'SET_CLIENTS',
        payload: clientResponse.data,
      });
    } catch (error) {
      console.log('fetchAllClients error:', error);
    }
  }

  export function* fetchClientDetails(action) {
    try {
      // Get the clientdetails:
      const clientResponse = yield axios.get(`/api/clients/${action.payload.id}`);
      // Set the value of the client reducer:
      yield put({
        type: 'SET_CLIENT_DETAILS',
        payload: clientResponse.data,
      });
    } catch (error) {
      console.log('fetchClientDetails error:', error);
    }
  }

  function* clientsSaga() {
    yield takeLatest('FETCH_CLIENTS', fetchAllClients);
    yield takeEvery('FETCH_CLIENT_DETAILS', fetchClientDetails);
  }
  
  export default clientsSaga;