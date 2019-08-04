import { all, fork } from 'redux-saga/effects';

import clientsSaga from '../sagas/clients';

const sagas = [
  clientsSaga,
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
