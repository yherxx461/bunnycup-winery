import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export function* fetchAllClients() {
    try {
      // Get the students:
      const clientResponse = yield axios.get('/api/clients');
      // Set the value of the students reducer:
      yield put({
        type: 'SET_CLIENTS',
        payload: clientResponse.data,
      });
    } catch (error) {
      console.log('fetchAllClients error:', error);
    }
  }

  function* clientsSaga() {
    yield takeLatest('FETCH_CLIENTS', fetchAllClients);
  }
  
  export default clientsSaga;