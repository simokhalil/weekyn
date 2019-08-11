import { eventChannel } from 'redux-saga';
import { call, cancelled, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { clientsDB, firebase } from '../../firebase/';
import { store } from '../store';

function subscribeToClients(userId, active = true) {
  return eventChannel((emmiter) => {
    firebase.db.collection('users').doc(userId).collection('clients').where('active', '==', active).orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
      const clients = [];

      snapshot.forEach(doc => {
        clients.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      console.log('got clients : ', clients);

      emmiter(clients);
    });

    return () => null;
  });
}

export function* getClientsSaga(action) {
  console.log('getClientsSaga ', action);

  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToClients, currentUser.uid, action.payload.active);

  yield takeEvery(channel, function* (clients) {
    yield put({ type: 'CLIENTS_SET_REDUX', payload: { clients } });
  });

  yield take('FETCH_CLIENTS_CANCEL')
  channel.close();

  /* try {
    while (true) {
      const clients = yield take(channel);

      console.log('SAGA got clients', clients);

      yield put({ type: 'CLIENTS_SET_REDUX', payload: { clients } });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  } */
}

export function* createClientSaga(action) {
  const { client } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {
    yield call(clientsDB.addClient(currentUser.uid, client));

    yield put({ type: 'CREATE_CLIENT_SUCCESS' });

  } catch (error) {
    yield put({ type: 'CREATE_CLIENT_ERROR' });
  }
}

export function* deleteClientSaga(action) {
  const state = store.getState();
  const currentUser = state.users.authUser;

  const { clientId } = action.payload;

  try {
    yield clientsDB.deleteClient(currentUser.uid, clientId);
  } catch (error) {
    yield put({ type: 'DELETE_CLIENT_ERROR' });
  }
}

function* watch() {
  yield takeLatest('FETCH_CLIENTS', getClientsSaga);
  yield takeLatest('CREATE_CLIENT', createClientSaga);
  yield takeLatest('DELETE_CLIENT', deleteClientSaga);
}

export default watch;
