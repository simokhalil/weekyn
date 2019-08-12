
export function getClients(active) {
  return {
    type: 'FETCH_CLIENTS',
    payload: { active },
  };
}

export function createClient(client, clientId = null) {
  return {
    type: 'CREATE_CLIENT',
    payload: { client, clientId },
  };
}

export function deleteClient(clientId) {
  return {
    type: 'DELETE_CLIENT',
    payload: { clientId },
  };
}
