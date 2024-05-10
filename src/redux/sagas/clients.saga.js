import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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

  export function* adminFetchClientDetails(action) {
    try {
      // Get the clientdetails:
      const clientResponse = yield axios.get(`/api/clients/admin/${action.payload.id}`);
      // Set the value of the client reducer:
      yield put({
        type: 'SET_CLIENT_DETAILS',
        payload: clientResponse.data,
      });
    } catch (error) {
      console.log('fetchClientDetails error:', error);
    }
  }

function* updateClient(action) {
  console.log('In update user', action.payload.id);
  try {
    yield axios.put(`/api/user`, action.payload);
    yield put ({type: 'SET_CLIENTS'});
  } catch (error) {
    console.log('Error with user update:', error);
    yield put({ type: 'UPDATE_FAILED' });
  }
}

  function* clientsSaga() {
    yield takeEvery('FETCH_CLIENTS', fetchAllClients);
    yield takeEvery('FETCH_CLIENT_DETAILS', fetchClientDetails);
    yield takeLatest('UPDATE', updateClient);
    yield takeEvery('FETCH_CLIENT_DETAILS_ADMIN', adminFetchClientDetails);
  }
  
  export default clientsSaga;