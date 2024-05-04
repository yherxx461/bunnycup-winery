import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInventory(action) {
  try {
    //get the inventory
    const inventoryResponse = yield axios.get(`/api/inventory/`);
    //put the inventory data in its reducer
    // console.log('THIS IS THE INVENTORY RESPONSE:', inventoryResponse.data);
    yield put({ type: 'SET_INVENTORY', payload: inventoryResponse.data });
  } catch (err) {
    console.log('fetchInventory saga error:', err);
  }
}

function* fetchImages(action) {
  try {
    //get the images
    const imageResponse = yield axios.get(`/api/inventory/images`);
    //put the image data in its reducer
    // console.log('THIS IS THE IMAGE RESPONSE:', imageResponse.data);
    yield put({ type: 'SET_IMAGES', payload: imageResponse.data });
  } catch (error) {
    console.log('fetchImages saga error:', error);
    yield put({ type: 'FETCH_IMAGES_FAILED', error: error.message });
  }
}

function* inventorySaga() {
  yield takeLatest('FETCH_INVENTORY', fetchInventory);
  yield takeLatest('FETCH_IMAGES', fetchImages);
}

export default inventorySaga;
