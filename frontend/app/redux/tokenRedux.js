const initialState = { token: null };

const tokenRedux = (state = initialState, action, token='') => {
  switch (action.type) {
    case 'login':
      return { token: token };
    case 'logout':
      return { token: null };
    default:
      return state;
  }
};

export default tokenRedux;