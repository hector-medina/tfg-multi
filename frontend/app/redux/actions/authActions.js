export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
  });

export const removeAuthToken = () => ({
    type: 'REMOVE_AUTH_TOKEN'
  });

export const setUserId = (user_id) => ({
    type: 'SET_USER_ID',
    payload: user_id,
  });

export const removeUserId = () => ({
    type: 'REMOVE_USER_ID'
  });