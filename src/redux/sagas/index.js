import { all, fork } from 'redux-saga/effects';

import clientsSaga from './clients';
import invoicesSaga from './invoices';
import projectsSaga from './projects';

const sagas = [
  clientsSaga,
  invoicesSaga,
  projectsSaga,
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
