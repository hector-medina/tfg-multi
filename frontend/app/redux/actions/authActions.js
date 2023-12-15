export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
  });

export const removeAuthToken = () => ({
    type: 'REMOVE_AUTH_TOKEN'
  });