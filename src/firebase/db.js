import { db } from './firebase';

// User API

export const doCreateUser = (id, name, email) => {
  console.log('creating user in db with id ', id);

  return db.collection('users').doc(id).set({
    name,
    email,
  });
}

export const onceGetUsers = () =>
  db.collection('users').get();

export const onceGetUser = (id) =>
  db.collection('users').doc(id).get();

// Other Entity APIs ...