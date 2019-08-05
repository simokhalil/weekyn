import { call, put, takeLatest } from 'redux-saga/effects';

import { projectsDB } from '../../firebase/';
import { store } from '../store';

/**
 * Add project Saga
 */
export function* addProjectSaga(action) {
  const { clientId, project } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {
    yield projectsDB.addProject(currentUser.uid, clientId, project);

    yield put({ type: 'CREATE_PROJECT_SUCCESS' });
  } catch (error) {
    console.warn('error adding project', error);
    yield put({ type: 'CREATE_PROJECT_ERROR' });
  }
}

function* watch() {
  yield takeLatest('ADD_PROJECT', addProjectSaga);
}

export default watch;