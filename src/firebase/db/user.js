import { db } from '../firebase';

export const doCreateUser = (id, name, email, settings) => {
  console.log('creating user in db with id ', id);

  return db.collection('users').doc(id).set({
    name,
    email,
    settings,
  });
}

export const onceGetUsers = () =>
  db.collection('users').get();

export const onceGetUser = (id) =>
  db.collection('users').doc(id).get();

export const saveSettings = (userId, settings) => {
  const collection = db.collection('users').doc(userId);

  console.log('DB.saveSettings', settings);

  return collection.update('settings', {
      ...settings,
  });
}
