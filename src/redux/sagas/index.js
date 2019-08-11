import { all, fork } from 'redux-saga/effects';

import clientsSaga from './clients';
import invoicesSaga from './invoices';
import projectsSaga from './projects';
import userSaga from './user';

const sagas = [
  clientsSaga,
  invoicesSaga,
  projectsSaga,
  userSaga,
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
