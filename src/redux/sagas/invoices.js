import { eventChannel } from 'redux-saga';
import { call, cancelled, put, take, takeLatest } from 'redux-saga/effects';

import { invoicesDB, firebase } from '../../firebase/';
import { store } from '../store';

function subscribeToInvoices(userId) {
  return eventChannel((emmiter) => {
    firebase.db.collection('users').doc(userId).collection('invoices').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const invoices = [];

      snapshot.forEach(doc => {
        invoices.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      console.log('got invoices : ', invoices);

      emmiter(invoices);
    });

    return () => null;
  });
}

export function* getInvoicesSaga(action) {
  console.log('getInvoicesSaga ', action);

  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToInvoices, currentUser.uid);

  try {
    while (true) {
      const invoices = yield take(channel);

      console.log('SAGA got clients', invoices);

      yield put({ type: 'INVOICES_SET_REDUX', payload: { invoices } });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* saveInvoiceSaga(action) {
  const { invoice: { id, ...invoice} } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {
    if (id) {
      yield call(invoicesDB.saveInvoice(currentUser.uid, id, invoice));
    } else {
      yield call(invoicesDB.createInvoice(currentUser.uid, invoice));
    }

    yield put({ type: 'SAVE_INVOICE_SUCCESS' });
  } catch (error) {
    console.log('SAVE_INVOICE_ERROR', error);
    yield put({ type: 'SAVE_INVOICE_ERROR' });
  }
}

export function* deleteInvoiceSaga(action) {
  const state = store.getState();
  const currentUser = state.users.authUser;

  const { invoiceId } = action.payload;

  try {
    yield invoicesDB.deleteInvoice(currentUser.uid, invoiceId);
  } catch (error) {
    yield put({ type: 'DELETE_INVOICE_ERROR' });
  }
}

function* watch() {
  yield takeLatest('FETCH_INVOICES', getInvoicesSaga);
  yield takeLatest('SAVE_INVOICE', saveInvoiceSaga);
  yield takeLatest('DELETE_INVOICE', deleteInvoiceSaga);
}

export default watch;
