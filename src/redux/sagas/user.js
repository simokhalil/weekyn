import { call, cancelled, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { userDB, firebase } from '../../firebase/';
import { store } from '../store';

function subscribeToUser(userId) {
  return eventChannel((emmiter) => {
    firebase.db.collection('users').doc(userId).onSnapshot(doc => {
      emmiter(doc.data());
    });

    return () => null;
  });
}

export function* getUserSaga(action) {
  console.log('getUserSaga ', action);

  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToUser, currentUser.uid);

  yield takeEvery(channel, function* (user) {
    yield put({ type: 'USER_SET_REDUX', payload: { user } });
  });

  yield take('GET_USER_CANCEL')
  channel.close();

  /* try {
    while (true) {
      const user = yield take(channel);

      console.log('SAGA got user update', user);

      yield put({ type: 'USER_SET_REDUX', payload: { user } });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  } */
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

function* watch() {
  yield takeLatest('GET_USER_SAGA', getUserSaga);
  yield takeLatest('SAVE_USER_SETTINGS', saveUserSettingsSaga);
}

export default watch;
