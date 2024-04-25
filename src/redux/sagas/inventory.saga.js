import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInventory (action) {
    try {
        //get the inventory
        const inventoryResponse = yield axios.get(`/api/inventory/`);
        //put the inventory data in its reducer
        // console.log('THIS IS THE INVENTORY RESPONSE:', inventoryResponse.data);
        yield put({ type: 'SET_INVENTORY', payload: inventoryResponse.data });
    }
    catch(err) {
        console.log('fetchInventory saga error:', err);
    }
}

function* inventorySaga() {
    yield takeLatest('FETCH_INVENTORY', fetchInventory);
  }
  
  export default inventorySaga;