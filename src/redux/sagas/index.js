import { all, fork } from 'redux-saga/effects';

import clientsSaga from '../sagas/clients';
import projectsSaga from '../sagas/projects';

const sagas = [
  clientsSaga,
  projectsSaga,
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
