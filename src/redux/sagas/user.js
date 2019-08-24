import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import AppConfig from '../../AppConfig';
import { auth, userDB, firebase } from '../../firebase/';
import { store, history } from '../store';

function subscribeToUser(userId) {
  let userUnsubscribe = null;
  return eventChannel((emmiter) => {
    userUnsubscribe = firebase.db.collection('users').doc(userId).onSnapshot(doc => {
      emmiter(doc.data());
    });

    return () => userUnsubscribe();
  });
}

export function* getUserSaga(action) {

  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToUser, currentUser.uid);

  yield takeEvery(channel, function* (user) {
    yield put({ type: 'USER_SET_REDUX', payload: { user } });
  });

  yield take('GET_USER_CANCEL');
  channel.close();
}

export function* saveUserSettingsSaga(action) {
  console.log('saveUserSettingsSaga', action);

  const { settings } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {

    yield userDB.saveSettings(currentUser.uid, settings);

    yield put({ type: 'SAVE_USER_SUCCESS' });
  } catch (error) {
    console.log('SAVE_USER_ERROR', error);
    yield put({ type: 'SAVE_USER_ERROR' });
  }
}

export function* userSignOutSaga(action) {
  yield put({ type: 'GET_USER_CANCEL' });
  yield put({ type: 'FETCH_CLIENTS_CANCEL' });
  yield put({ type: 'FETCH_INVOICES_CANCEL' });
  yield put({ type: 'GET_PROJECTS_CANCEL' });

  yield put({
    type: 'USER_SIGNED_OUT',
    data: {
      redirectTo: action.payload,
    },
  });

  auth.doSignOut();
}

function* watch() {
  yield takeLatest('GET_USER_SAGA', getUserSaga);
  yield takeLatest('SAVE_USER_SETTINGS', saveUserSettingsSaga);
  yield takeLatest('LOGOUT_USER', userSignOutSaga);
}

export default watch;
