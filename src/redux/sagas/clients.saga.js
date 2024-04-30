import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClients (action) {
    try {
        //get the clients
        const clientsResponse = yield axios.get(`/api/clients/`);
        //put the clients data in its reducer
        // console.log('THIS IS THE CLIENTS RESPONSE:', clientsResponse.data);
        yield put({ type: 'SET_CLIENTS', payload: clientsResponse.data });
    }
    catch(err) {
        console.log('fetchClients saga error:', err);
    }
}

function* clientsSaga() {
    yield takeLatest('FETCH_ALL_CLIENTS', fetchClients);
  }

  export default clientsSaga;