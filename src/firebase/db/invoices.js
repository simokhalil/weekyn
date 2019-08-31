import firebase from 'firebase/app';

import { db } from '../firebase';

/**
 * add a project
 * @param {*} userId
 * @param {*} clientId
 */
export const createInvoice = async (userId, invoice) => {
  const collection = db.collection('users').doc(userId).collection('invoices');

  const now = (new Date()).getTime();

  const userRef = db.collection('users').doc(userId);
  const increment = firebase.firestore.FieldValue.increment(1);

  userRef.update({ invoicesCount: increment });

  return collection.add({
    ...invoice,
    createdAt: now,
    updatedAt: now,
  });
}

export const saveInvoice = (userId, invoiceId, invoice) => {
  const collection = db.collection('users').doc(userId).collection('invoices').doc(invoiceId);

  return collection.set({
    ...invoice,
  }, { merge: true });
}

export const getInvoice = (userId, invoiceId) => {
  const collection = db.collection('users').doc(userId).collection('invoices').doc(invoiceId);

  return collection.get();
}

export const getInvoicesPerClient = (userId, clientId) => {
  const collection = db.collection('users').doc(userId).collection('invoices');

  return collection.where('clientId', '==', clientId);
}

export const setInvoiceStatus = (userId, invoiceId, status) => {
  const collection = db.collection('users').doc(userId).collection('invoices').doc(invoiceId);

  return collection.set({
    status,
  }, { merge: true });
}
