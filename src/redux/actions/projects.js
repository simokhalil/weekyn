export function addProject(clientId, project) {
  return {
    type: 'ADD_PROJECT',
    payload: { clientId, project },
  };
}
