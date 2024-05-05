import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sendEmail (action) {
    try {
        //send email with order info to winery
        const emailResponse = yield axios.post(`/api/email/`, action.payload); //NEED TO FIGURE OUT WHAT PAYLOAD WILL BE FROM ORDER SUBMISSION
        //PUT yielded SWEETALERT HERE INDICATING SUCCESSFUL EMAIL SENT???------------------------------------
        // console.log();
    }
    catch(err) {
        console.log('sendEmail saga error:', err);
    }
}

function* emailSaga() {
    yield takeLatest('SEND_EMAIL', sendEmail);
  }
  
  export default emailSaga;