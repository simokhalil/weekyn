import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { clientsDB, firebase } from '../../firebase/';
import { store } from '../store';

function subscribeToClients(userId, active = true) {
  let clientsUsubscribe = null;

  return eventChannel((emmiter) => {
    clientsUsubscribe = firebase.db.collection('users').doc(userId).collection('clients').orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
      const clients = [];
      const activeClients = [];
      const archivedClients = [];

      snapshot.forEach(doc => {
        const clientData = doc.data();

        clients.push({
          ...clientData,
          id: doc.id,
        });

        if (clientData.active) {
          activeClients.push({
            ...clientData,
            id: doc.id,
          })
        } else {
          archivedClients.push({
            ...clientData,
            id: doc.id,
          })
        }
      });

      emmiter({ clients, activeClients, archivedClients });
    });

    return () => clientsUsubscribe();
  });
}

export function* getClientsSaga(action) {
  const state = store.getState();
  const currentUser = state.users.authUser;

  const channel = yield call(subscribeToClients, currentUser.uid, action.payload.active);

  yield takeEvery(channel, function* (clients) {
    yield put({ type: 'CLIENTS_SET_REDUX', payload: { clients } });
  });

  yield take('FETCH_CLIENTS_CANCEL');
  channel.close();
}

export function* createClientSaga(action) {
  const { client, clientId } = action.payload;

  const state = store.getState();
  const currentUser = state.users.authUser;

  try {
    if (clientId) {
      yield clientsDB.saveClient(currentUser.uid, clientId, client);
    } else {
      yield clientsDB.addClient(currentUser.uid, client);
    }

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
